/** Canonical contact channels for GONLINE */
export const WHATSAPP_NUMBER = "6285117388880";
export const WHATSAPP_DISPLAY = "+62 851 7388 8880";
export const PHONE_DISPLAY = "0851 7388 8880";
export const EMAIL = "gonlinecreative@gmail.com";

export function whatsappUrl(message?: string, phone = WHATSAPP_NUMBER): string {
  const digits = phone.replace(/\D/g, "") || WHATSAPP_NUMBER;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
