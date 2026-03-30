"use client";

import { useEffect, useState } from "react";

/* logo row */
function LogoRow({
  logos,
  direction = "left",
}: {
  logos: { companyLogo: string; companyName: string }[];
  direction?: "left" | "right";
}) {
  const duplicated = [...logos, ...logos];

  return (
    <div className="overflow-hidden relative">
      <div className={`scroll-track-logo scroll-${direction}`}>
        {duplicated.map((item, i) => (
          <div
            key={`${direction}-${i}`}
            className="transition flex items-center justify-center p-5 bg-white rounded-main"
          >
            <img
              src={item.companyLogo}
              alt={item.companyName}
              className="h-20 w-auto object-contain rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* shuffle helper */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = (i * 7 + 3) % arr.length;
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type Client = {
  id: number;
  companyLogo: string | null;
  companyName: string;
};

export const RunningClientsLogo = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APIURL}/business/clients?limit=100`
        );
        const json = await res.json();

        // filter yang companyLogo-nya tidak null
        const filtered: Client[] = (json?.data ?? json)
          .filter((c: Client) => c.companyLogo !== null)
          .map((c: Client) => ({
            id: c.id,
            companyLogo: c.companyLogo as string,
            companyName: c.companyName,
          }));

        setClients(filtered);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const validClients = clients.filter((c): c is Client & { companyLogo: string } => c.companyLogo !== null);
  const row1 = [...validClients, ...validClients];
  const row2 = [...shuffleArray(validClients), ...shuffleArray(validClients)];

  if (loading) {
    return (
      <section className="spacing flex items-center justify-center min-h-40">
        <p className="text-muted-foreground text-sm animate-pulse">
          Loading clients...
        </p>
      </section>
    );
  }

  if (clients.length === 0) return null;

  return (
    <section className="spacing overflow-hidden relative">
      <style>{`
        :root {
          --scroll-speed: 120s;
        }
        .scroll-track-logo {
          display: flex;
          width: max-content;
          gap: 2rem;
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
      <div className="pointer-events-none absolute left-0 top-0 h-full w-10 md:w-32 bg-linear-to-r from-lightColor dark:from-darkColor to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-10 md:w-32 bg-linear-to-l from-lightColor dark:from-darkColor to-transparent z-10" />

      {/* rows */}
      <div className="space-y-10 select-none cursor-default">
        <LogoRow logos={row1} direction="left" />
        <LogoRow logos={row2} direction="right" />
      </div>
    </section>
  );
};