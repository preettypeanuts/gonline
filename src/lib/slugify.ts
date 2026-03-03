export function slugify(text: string): string {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export function plusfy(text: string): string {
  let formatted = text.toString();

  // Encode karakter khusus terlebih dahulu
  formatted = formatted.replace(/&/g, '%26');

  // Capitalize setiap kata
  formatted = formatted
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formatted
    .replace(/\s+/g, '+')        // spasi → +
    .replace(/[^\w+%]/g, '')     // izinkan huruf, angka, _, +, dan %
    .replace(/\++/g, '+')        // rapikan multiple +
    .replace(/^\+/, '')          // trim + di awal
    .replace(/\+$/, '');         // trim + di akhir
}



export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ') // Ganti dash dengan spasi
    .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi huruf pertama tiap kata
}
