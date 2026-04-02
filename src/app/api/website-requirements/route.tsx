import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { v2 as cloudinary } from "cloudinary";
import * as XLSX from "xlsx";

// ─── Cloudinary Config ───────────────────────────────────────────────────────

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ?? "",
    api_key: process.env.CLOUDINARY_API_KEY ?? "",
    api_secret: process.env.CLOUDINARY_API_SECRET ?? "",
});

// ─── Types ───────────────────────────────────────────────────────────────────

type SubmissionData = Record<string, string>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sanitizeFolderName(name: string): string {
    return name
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}



async function uploadToCloudinary(file: File, folder: string): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise<string>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder, resource_type: "auto" },
            (error, result) => {
                if (error || !result) {
                    reject(error ?? new Error("Cloudinary upload returned no result"));
                    return;
                }
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
}

const FIELD_LABELS: Record<string, string> = {
    nama_pt: "Nama PT / Badan Usaha",
    nama_brand: "Nama Brand",
    jenis_usaha: "Jenis Usaha",
    penjelasan_produk: "Penjelasan Produk / Jasa",
    target_market: "Target Market",
    about_us: "About Us",
    visi_misi: "Visi & Misi",
    product_services: "Product / Services",
    keunggulan_utama: "Keunggulan Utama",
    slogan: "Slogan",
    motto: "Motto",
    google_maps: "Link Google Maps",
    alamat: "Alamat Lengkap",
    phone: "Phone",
    email: "Email",
    email_pic: "Email PIC",
    whatsapp: "WhatsApp",
    instagram: "Instagram",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    twitter: "X (Twitter)",
    tiktok: "TikTok",
    cta_tujuan: "Tujuan CTA",
    tone: "Tone Konten",
    butuh_bantuan_asset: "Butuh Bantuan Asset",
    butuh_bantuan_konten: "Butuh Bantuan Generate Konten",
    assets: "Asset URLs (Cloudinary)",
};

function generateXLSX(data: SubmissionData): Buffer {
    const rows = Object.entries(data).map(([key, value]) => ({
        Field: FIELD_LABELS[key] ?? key,
        Value: value || "-",
    }));

    const ws = XLSX.utils.json_to_sheet(rows);
    ws["!cols"] = [{ wch: 35 }, { wch: 80 }];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Requirements");

    return Buffer.from(XLSX.write(wb, { type: "buffer", bookType: "xlsx" }));
}

function buildHtmlBody(baseName: string, folderName: string, assetUrls: string[]): string {
    const assetList =
        assetUrls.length > 0
            ? `<h3>Asset URLs:</h3><ul>${assetUrls.map((u) => `<li>${u}</li>`).join("")}</ul>`
            : "<p>Tidak ada asset yang diupload.</p>";

    return `
    <h2>New Website Requirements Submission</h2>
    <p><strong>Nama:</strong> ${baseName}</p>
    <p><strong>Folder Cloudinary:</strong> ${folderName}</p>
    <p><strong>Total Assets:</strong> ${assetUrls.length} file(s)</p>
    <hr/>
    <p>Detail lengkap ada di attachment spreadsheet.</p>
    ${assetList}
  `;
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const formData = await req.formData();
        const data: SubmissionData = {};
        const assetUrls: string[] = [];

        const namaPT = String(formData.get("nama_pt") ?? "").trim();
        const brand = String(formData.get("nama_brand") ?? "").trim();
        const baseName = brand || namaPT || "unknown";
        const cleanName = sanitizeFolderName(baseName);
        const folderName = `website-requirements/${cleanName}-${Date.now()}`;

        // ── Parse form entries ──
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                if (value.size > 1 * 1024 * 1024) {
                    assetUrls.push(`${key}: [Ditolak - File melebihi 1MB]`);
                    continue;
                }
                if (value.size > 0) {
                    try {
                        const url = await uploadToCloudinary(value, folderName);
                        assetUrls.push(`${key}: ${url}`);
                    } catch (uploadErr) {
                        console.error(`[Cloudinary] Upload failed for "${key}":`, uploadErr);
                        assetUrls.push(`${key}: [Upload Gagal]`);
                    }
                }
            } else {
                data[key] = value;
            }
        }

        data["assets"] = assetUrls.length > 0 ? assetUrls.join("\n") : "-";

        // ── Generate XLSX ──
        const xlsxBuffer = generateXLSX(data);
        const emailPIC = data["email_pic"]?.trim() || "";

        // ── Send email ──
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER ?? "",
                pass: process.env.SMTP_PASS ?? "",
            },
        });

        await transporter.sendMail({
            from: `"Website Form" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_TO ?? "",
            ...(emailPIC ? { cc: emailPIC } : {}),
            subject: `[Website Requirements] ${baseName}`,
            html: buildHtmlBody(baseName, folderName, assetUrls),
            attachments: [
                {
                    filename: `requirements-${cleanName}.xlsx`,
                    content: xlsxBuffer,
                    contentType:
                        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                },
            ],
        });

        return NextResponse.json({ success: true, folder: folderName, assets: assetUrls });
    } catch (error) {
        console.error("[API] POST /submit-requirements error:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}