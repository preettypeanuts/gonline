import { JsonLd } from "./json-ld";

export type FaqItem = {
  question: string;
  answer: string;
};

export function FaqSchema({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}
