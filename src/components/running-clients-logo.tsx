import {
  ShoppingCart,
  Apple,
  Monitor,
  Music,
  MessageSquare,
  Store,
  CreditCard,
  Home,
  LucideIcon,
} from "lucide-react";

/* shuffle helper */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}

/* logo row */
function LogoRow({
  logos,
  direction = "left",
}: {
  logos: { icon: LucideIcon; label: string }[];
  direction?: "left" | "right";
}) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative">
      <div className={`scroll-track-logo scroll-${direction}`}>
        {duplicated.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={`${direction}-${i}`}
              className="text-neutral-400 opacity-70 hover:opacity-100 transition"
            >
              <Icon size={48} strokeWidth={1.5} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const RunningClientsLogo = () => {
  const clientsLogo = [
    { icon: ShoppingCart, label: "Amazon" },
    { icon: Apple, label: "Apple" },
    { icon: Monitor, label: "Microsoft" },
    { icon: Music, label: "Spotify" },
    { icon: MessageSquare, label: "Slack" },
    { icon: Store, label: "Shopify" },
    { icon: CreditCard, label: "PayPal" },
    { icon: Home, label: "Airbnb" },
  ];

  const row1 = [...clientsLogo, ...clientsLogo];
  const row2 = [
    ...shuffleArray(clientsLogo),
    ...shuffleArray(clientsLogo),
  ];

  return (
    <section className="spacing overflow-hidden relative">
      <style>{`
        :root {
          --scroll-speed: 120s;
        }

        .scroll-track-logo {
          display: flex;
          width: max-content;
          gap: 4rem;
          will-change: transform;
        }

        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        .scroll-left {
          animation: scroll-left var(--scroll-speed) linear infinite;
        }

        .scroll-right {
          animation: scroll-right var(--scroll-speed) linear infinite;
        }
      `}</style>

      {/* title */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">
          Our <span className="text-thirdColor">Clients</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Trusted by businesses across various industries
        </p>
      </div>

      {/* gradient edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-linear-to-r from-lightColor dark:from-darkColor to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-linear-to-l from-lightColor dark:from-darkColor to-transparent z-10" />

      {/* rows */}
      <div className="space-y-10 select-none cursor-default">
        <LogoRow logos={row1} direction="left" />
        <LogoRow logos={row2} direction="right" />
      </div>
    </section>
  );
};