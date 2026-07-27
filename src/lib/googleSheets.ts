import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { Ad } from "@/types/ad";
import { WebWork } from "@/types/web-work";

export function getSheetsClient() {
  const raw = process.env.GOOGLE_SHEETS_CREDENTIALS!;

  // Parse credentials, handle escaped newlines dari .env
  const credentials = JSON.parse(raw);

  // Pastikan private_key punya newline yang benar
  if (credentials.private_key) {
    credentials.private_key = credentials.private_key.replace(/\\n/g, "\n");
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  return google.sheets({ version: "v4", auth });
}

export const getAds = unstable_cache(
  async (): Promise<Ad[]> => {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "ads!A1:E100",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const [headers, ...dataRows] = rows;

    return dataRows
      .map((row) => {
        const get = (col: string) => row[headers.indexOf(col)] ?? "";
        return {
          id: get("id"),
          status: get("status") === "TRUE",
          priority: Number(get("priority")) || 0,
          image: get("image"),
          href: get("href"),
        } satisfies Ad;
      })
      .filter((a) => a.status)
      .sort((a, b) => a.priority - b.priority);
  },
  ["ads"],
  { revalidate: 60 },
);

export const getWorks = unstable_cache(
  async (): Promise<WebWork[]> => {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: "webWorks!A1:I1000",
    });

    const rows = response.data.values;
    if (!rows || rows.length < 2) return [];

    const [headers, ...dataRows] = rows;

    return dataRows
      .map((row) => {
        const get = (col: string) => row[headers.indexOf(col)]?.trim() ?? "";
        return {
          id: get("id"),
          status: get("Status") === "TRUE",
          link: get("Link"),
          category: get("Category"),
          imagePreview: get("ImagePreview"),
          companyName: get("CompanyName"),
          brandName: get("BrandName"),
          features: get("Features")
            ? get("Features")
                .split(";")
                .map((f: string) => f.trim())
                .filter(Boolean)
            : [],
          kind: get("Kind"),
        } satisfies WebWork;
      })
      .filter((w) => w.status);
  },
  ["works"],
  { revalidate: 60 },
);
