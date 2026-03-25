export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function categoryToSlug(category: string): string {
  return slugify(category);
}

export function slugToCategory(
  slug: string,
  categories: string[],
): string | null {
  return categories.find((c) => slugify(c) === slug) ?? null;
}

export function plusfy(text: string): string {
  let formatted = text.toString();

  // Encode karakter khusus terlebih dahulu
  formatted = formatted.replace(/&/g, "%26");

  // Capitalize setiap kata
  formatted = formatted
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formatted
    .replace(/\s+/g, "+") // spasi → +
    .replace(/[^\w+%]/g, "") // izinkan huruf, angka, _, +, dan %
    .replace(/\++/g, "+") // rapikan multiple +
    .replace(/^\+/, "") // trim + di awal
    .replace(/\+$/, ""); // trim + di akhir
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, " ") // Ganti dash dengan spasi
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi huruf pertama tiap kata
}
