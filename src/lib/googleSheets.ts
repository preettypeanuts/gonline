import { google } from "googleapis";
import { unstable_cache } from "next/cache";
import { slugify } from "./slugify";
import { Article } from "@/types/article";
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

export const getArticles = unstable_cache(
  async (): Promise<Article[]> => {
    const sheets = getSheetsClient();
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID!;
    const range = process.env.GOOGLE_SHEETS_RANGE_ARTICLE ?? "article!A1:K1000";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
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
          highlight: get("highlight") === "TRUE",
          category: get("category"),
          slug: slugify(get("title")),
          title: get("title"),
          content: get("content"),
          excerpt: get("excerpt"),
          coverImage: get("coverImage"),
          createdAt: get("createdAt"),
          updatedAt: get("updatedAt"),
          tags: get("tags")
            ? get("tags")
                .split(";")
                .map((t: string) => t.trim())
            : [],
        } satisfies Article;
      })
      .filter((a) => a.status)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
  },
  ["articles"],
  { revalidate: 60 },
);

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((a) => a.id === id) ?? null;
}

export async function getArticleBySlug(
  categorySlug: string,
  slug: string,
): Promise<Article | null> {
  const articles = await getArticles();
  return (
    articles.find(
      (a) => slugify(a.category) === categorySlug && a.slug === slug,
    ) ?? null
  );
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
