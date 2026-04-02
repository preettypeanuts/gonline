"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ReusableBanner } from "@/components/reusable-banner";

// ─── Constants ────────────────────────────────────────────────────────────────

const IDENTITY_FIELDS = [
    { label: "About Us", key: "about_us", required: false },
    { label: "Visi & Misi", key: "visi_misi", required: false },
    { label: "Product / Services", key: "product_services", required: true },
    { label: "Keunggulan Utama", key: "keunggulan_utama", required: false },
] as const;

const SOCIAL_PLATFORMS = [
    { label: "WhatsApp", key: "whatsapp" },
    { label: "Instagram", key: "instagram" },
    { label: "Facebook", key: "facebook" },
    { label: "LinkedIn", key: "linkedin" },
    { label: "X (Twitter)", key: "twitter" },
    { label: "TikTok", key: "tiktok" },
] as const;

// Keys yang nilainya text (bukan file / checkbox / identity)
const TEXT_FIELD_KEYS = [
    "nama_pt",
    "nama_brand",
    "jenis_usaha",
    "penjelasan_produk",
    "target_market",
    "slogan",
    "motto",
    "google_maps",
    "alamat",
    "phone",
    "email",
    "email_pic",
    "whatsapp",
    "instagram",
    "facebook",
    "linkedin",
    "twitter",
    "tiktok",
    "cta_tujuan",
    "tone",
] as const;

type TextFieldKey = (typeof TEXT_FIELD_KEYS)[number];
type IdentityKey = (typeof IDENTITY_FIELDS)[number]["key"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ text, required }: { text: string; required?: boolean }) {
    return (
        <div className="flex items-center gap-2">
            <Label className="font-medium">{text}</Label>
            <span
                className={`text-xs tracking-widest font-medium px-1.5 rounded-full ${required
                    ? "text-destructive bg-red-50 dark:bg-red-950"
                    : "text-muted-foreground bg-lightColor dark:bg-darkColor"
                    }`}
            >
                {required ? "required" : "optional"}
            </span>
        </div>
    );
}

// ─── Types ────────────────────────────────────────────────────────────────────

type AssetEntry = { id: number; file: File | null };
type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Page ─────────────────────────────────────────────────────────────────────

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Form Requirements Website | GONLINE",
    description:
        "Isi form requirements website untuk memulai proses pembuatan website bersama GONLINE. Lengkapi informasi bisnis, konten, dan asset yang dibutuhkan untuk pengembangan website Anda.",
    keywords: [
        "form pembuatan website",
        "website requirements form",
        "brief pembuatan website",
        "form kebutuhan website",
        "jasa pembuatan website",
        "web development brief",
        "konsultasi website bisnis",
    ],
    alternates: {
        canonical: "https://www.gonline.id/website-requirements",
    },
    robots: { index: false, follow: true }, // ❗ ini penting (bukan halaman SEO)
    openGraph: {
        title: "Form Requirements Website | GONLINE",
        description:
            "Lengkapi form requirements untuk memulai pembuatan website bersama GONLINE.",
        url: "https://www.gonline.id/website-requirements",
        siteName: "GONLINE",
        locale: "id_ID",
        type: "website",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Form Requirements Website GONLINE",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Form Requirements Website | GONLINE",
        description:
            "Isi form untuk memulai proses pembuatan website bersama GONLINE.",
        images: ["/og-image.jpg"],
    },
};

export default function WebsiteRequirementsPage() {
    // Text field refs — keseluruhan dalam satu object, type-safe
    const textRefs = useRef<Record<TextFieldKey, HTMLInputElement | HTMLTextAreaElement | null>>(
        Object.fromEntries(TEXT_FIELD_KEYS.map((k) => [k, null])) as Record<
            TextFieldKey,
            HTMLInputElement | HTMLTextAreaElement | null
        >
    );

    // Identity textarea refs
    const identityRefs = useRef<Record<IdentityKey, HTMLTextAreaElement | null>>({
        about_us: null,
        visi_misi: null,
        product_services: null,
        keunggulan_utama: null,
    });

    // State
    const [generateFields, setGenerateFields] = useState<Record<string, boolean>>({});
    const [assets, setAssets] = useState<AssetEntry[]>([{ id: 0, file: null }]);
    const [butuhAsset, setButuhAsset] = useState(false);
    const [generateContent, setGenerateContent] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // ── Helpers ──

    function toggleGenerate(label: string) {
        setGenerateFields((prev) => ({ ...prev, [label]: !prev[label] }));
    }

    function addAsset() {
        setAssets((prev) => [...prev, { id: Date.now(), file: null }]);
    }

    function removeAsset(id: number) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
    }

    function setAssetFile(id: number, file: File | null) {
        if (file && file.size > 1 * 1024 * 1024) {
            toast.error(`File ditolak`, {
                description: `"${file.name}" melebihi batas maksimal 1MB.`,
            });
            return;
        }
        setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, file } : a)));
    }

    function getTextValue(key: TextFieldKey): string {
        return textRefs.current[key]?.value?.trim() ?? "";
    }

    function getIdentityValue(key: IdentityKey): string {
        return identityRefs.current[key]?.value?.trim() ?? "";
    }

    // ── Validation ──

    function validate(): string | null {
        if (!getTextValue("nama_pt")) return "Nama PT / Badan Usaha wajib diisi.";
        if (!getTextValue("jenis_usaha")) return "Jenis Usaha wajib diisi.";
        if (!generateFields["Product / Services"] && !getIdentityValue("product_services"))
            return "Product / Services wajib diisi atau pilih Bantu Generate.";
        if (!getTextValue("phone")) return "Phone wajib diisi.";
        if (!getTextValue("email_pic")) return "Email PIC wajib diisi.";
        return null;
    }

    // ── Submit ──

    async function handleSubmit() {
        const validationError = validate();
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        setErrorMessage("");
        setSubmitStatus("submitting");

        try {
            const formData = new FormData();

            // Text fields
            for (const key of TEXT_FIELD_KEYS) {
                formData.append(key, getTextValue(key));
            }

            // Identity fields
            for (const field of IDENTITY_FIELDS) {
                if (generateFields[field.label]) {
                    formData.append(field.key, "[GENERATE]");
                } else {
                    formData.append(field.key, getIdentityValue(field.key));
                }
            }

            // Checkboxes
            formData.append("butuh_bantuan_asset", butuhAsset ? "Ya" : "Tidak");
            formData.append("butuh_bantuan_konten", generateContent ? "Ya" : "Tidak");

            // Files
            assets.forEach((asset, i) => {
                if (asset.file) {
                    formData.append(i === 0 ? "logo" : `asset_${i + 1}`, asset.file);
                }
            });

            const res = await fetch("/api/website-requirements", {
                method: "POST",
                body: formData,
            });

            const json = await res.json();

            if (!res.ok || !json.success) {
                throw new Error(json.message ?? "Server error");
            }

            setSubmitStatus("success");
        } catch (err) {
            console.error("[Submit]", err);
            setErrorMessage("Gagal mengirim. Silakan coba lagi atau hubungi tim kami.");
            setSubmitStatus("error");
        }
    }

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    // ── Success screen ──

    if (submitStatus === "success") {
        return (
            <div className="max-w-4xl mx-auto py-10 mt-25 bg-white dark:bg-black rounded-main p-8 shadow-mainShadow text-center space-y-4">
                <div className="text-green-500 text-5xl">✓</div>
                <h2 className="text-2xl font-bold">Submission Berhasil!</h2>
                <p className="text-muted-foreground">
                    Data dan assets Anda telah kami terima. Tim kami akan segera menghubungi Anda.
                </p>
                <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                    Isi Form Lagi
                </Button>
            </div>
        );
    }

    // ── Form ──

    const isSubmitting = submitStatus === "submitting";

    return (
        <>
            <ReusableBanner
                title="Project"
                highlight="Brief"
                imageUrl="https://images.unsplash.com/photo-1734784547175-e02d14fff45c?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div className="max-w-4xl mx-auto py-10 space-y-8 mt-10 bg-white dark:bg-black rounded-main p-8 shadow-mainShadow">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold">Website Development Requirements</h1>
                    <p className="text-sm text-muted-foreground">
                        Silakan isi form berikut dengan informasi yang tersedia untuk membantu kami memahami
                        kebutuhan website Anda. Pada bagian opsional, kosongkan saja jika dirasa tidak
                        diperlukan.
                    </p>
                </div>

                {/* ── Informasi Bisnis ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Informasi Bisnis</h2>

                    <div className="space-y-2">
                        <FieldLabel text="Nama PT / Badan Usaha" required />
                        <Input ref={(el) => { textRefs.current["nama_pt"] = el; }} placeholder="Masukkan nama PT / Badan Usaha" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Nama Brand" />
                        <Input ref={(el) => { textRefs.current["nama_brand"] = el; }} placeholder="Masukkan nama brand" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Jenis Usaha" required />
                        <Input ref={(el) => { textRefs.current["jenis_usaha"] = el; }} placeholder="Masukkan jenis usaha" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Penjelasan Produk / Jasa" required />
                        <Textarea
                            ref={(el) => { textRefs.current["penjelasan_produk"] = el; }}
                            placeholder="Minimal 2-3 kalimat"
                        />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Target Market" />
                        <Input
                            ref={(el) => { textRefs.current["target_market"] = el; }}
                            placeholder="Contoh: UMKM, B2B, dll"
                        />
                    </div>
                </section>

                {/* ── Company Identity ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Company Identity</h2>

                    {IDENTITY_FIELDS.map((field) => {
                        const isGenerate = !!generateFields[field.label];
                        return (
                            <div key={field.key} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <FieldLabel text={field.label} required={field.required} />
                                    {!field.key.includes("product_services") && (

                                        <Button
                                            type="button"
                                            size="xs"
                                            variant={isGenerate ? "invert" : "outline"}
                                            onClick={() => toggleGenerate(field.label)}
                                        >
                                            {isGenerate ? (
                                                <span className="flex items-center gap-1">
                                                    <CheckIcon className="w-4 h-4" /> Bantu Generate
                                                </span>
                                            ) : (
                                                "Bantu Generate"
                                            )}
                                        </Button>
                                    )}
                                </div>
                                <Textarea
                                    ref={(el) => { identityRefs.current[field.key] = el; }}
                                    disabled={isGenerate}
                                    value={isGenerate ? "Akan di-generate oleh tim kami" : undefined}
                                    placeholder={isGenerate ? "" : "Isi manual atau gunakan generate"}
                                    onChange={() => { }} // controlled hanya saat isGenerate
                                />
                            </div>
                        );
                    })}

                    <div className="space-y-2">
                        <FieldLabel text="Slogan" />
                        <Input ref={(el) => { textRefs.current["slogan"] = el; }} placeholder="Masukkan slogan" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Motto" />
                        <Input ref={(el) => { textRefs.current["motto"] = el; }} placeholder="Masukkan motto" />
                    </div>
                </section>

                {/* ── Assets ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Assets</h2>
                    <p className="text-sm text-muted-foreground">
                        Upload logo, foto produk, atau video yang akan digunakan di website
                    </p>

                    {assets.map((asset, i) => (
                        <div key={asset.id} className="space-y-2 border p-3 rounded-xl">
                            <div className="flex items-center justify-between">
                                <FieldLabel text={i === 0 ? "Logo" : `Asset ${i + 1}`} required={i === 0} />
                                {i !== 0 && (
                                    <Button
                                        type="button"
                                        size="xs"
                                        variant="destructive"
                                        onClick={() => removeAsset(asset.id)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                            <Input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] ?? null;
                                    if (file && file.size > 1 * 1024 * 1024) {
                                        toast.error("File ditolak", {
                                            description: `"${file.name}" melebihi batas maksimal 1MB.`,
                                        });
                                        e.target.value = ""; // reset input
                                        return;
                                    }
                                    setAssetFile(asset.id, file);
                                }}
                            />
                            <p className="text-xs text-muted-foreground">Maks. 1MB per file</p>
                        </div>
                    ))}

                    <Button type="button" variant="outline" onClick={addAsset}>
                        + Add More
                    </Button>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="asset-help"
                            checked={butuhAsset}
                            onCheckedChange={(v) => setButuhAsset(!!v)}
                        />
                        <Label htmlFor="asset-help">Butuh bantuan asset</Label>
                    </div>
                </section>

                {/* ── Address ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Address</h2>

                    <div className="space-y-2">
                        <FieldLabel text="Link Google Maps" />
                        <Input ref={(el) => { textRefs.current["google_maps"] = el; }} placeholder="https://maps.google.com/..." />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Alamat Lengkap" />
                        <Textarea ref={(el) => { textRefs.current["alamat"] = el; }} placeholder="Masukkan alamat lengkap" />
                    </div>
                </section>

                {/* ── Contact ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Contact</h2>

                    <div className="space-y-2">
                        <FieldLabel text="Phone" required />
                        <Input ref={(el) => { textRefs.current["phone"] = el; }} placeholder="Masukkan nomor telepon" />
                    </div>

                    <div className="space-y-2">
                        <FieldLabel text="Email" />
                        <Input
                            ref={(el) => { textRefs.current["email"] = el; }}
                            type="email"
                            placeholder="email@perusahaan.com"
                        />
                    </div>


                </section>

                {/* ── Social Media ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Social Media</h2>

                    {SOCIAL_PLATFORMS.map((p) => (
                        <div key={p.key} className="space-y-2">
                            <FieldLabel text={p.label} />
                            <Input ref={(el) => { textRefs.current[p.key] = el; }} placeholder={`https://www.${p.key}.com/ atau @${p.key}`} />
                        </div>
                    ))}
                </section>

                {/* ── CTA ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Call To Action</h2>

                    <div className="space-y-2">
                        <FieldLabel text="Tujuan CTA" required />
                        <Input
                            ref={(el) => { textRefs.current["cta_tujuan"] = el; }}
                            placeholder="WA / Form / Marketplace"
                        />
                    </div>
                </section>

                {/* ── Generate Konten ── */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">Bantuan Generate Konten</h2>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="generate"
                            checked={generateContent}
                            onCheckedChange={(v) => setGenerateContent(!!v)}
                        />
                        <Label htmlFor="generate">Butuh bantuan generate konten</Label>
                    </div>

                    {generateContent && (
                        <div className="space-y-2">
                            <FieldLabel text="Tone" />
                            <Input
                                ref={(el) => { textRefs.current["tone"] = el; }}
                                placeholder="Formal / Santai / Persuasif"
                            />
                        </div>
                    )}
                </section>

                <div className="space-y-2">
                    <FieldLabel text="Email PIC" required />
                    <Input
                        ref={(el) => { textRefs.current["email_pic"] = el; }}
                        type="email"
                        placeholder="email@perusahaan.com"
                    />
                </div>

                {/* Error message */}
                {(submitStatus === "error" || errorMessage) && (
                    <p className="text-sm text-destructive text-center">{errorMessage}</p>
                )}

                {/* Submit */}
                <Button
                    variant="invert"
                    className="w-full"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Mengirim...
                        </>
                    ) : (
                        "Submit Requirements"
                    )}
                </Button>
            </div>
        </>
    );
}