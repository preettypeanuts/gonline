type IconProps = {
  className?: string
  filled?: boolean
}

/* HOME */
export const IconHome = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M128 32l96 96v88a8 8 0 0 1-8 8h-56v-64H96v64H40a8 8 0 0 1-8-8v-88z" />
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <path d="M32 120l96-96 96 96" />
      <path d="M40 112v96h64v-64h48v64h64v-96" />
    </svg>
  )

/* INSIGHT */
export const IconInsight = ({ className, filled }: IconProps) =>
  filled ? (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="currentColor"
    >
      <path d="M231.65,194.55,198.46,36.75a16,16,0,0,0-19-12.39L132.65,34.42a16.08,16.08,0,0,0-12.3,19l33.19,157.8A16,16,0,0,0,169.16,224a16.25,16.25,0,0,0,3.38-.36l46.81-10.06A16.09,16.09,0,0,0,231.65,194.55ZM136,50.15c0-.06,0-.09,0-.09l46.8-10,3.33,15.87L139.33,66Zm10,47.38-3.35-15.9,46.82-10.06,3.34,15.9Zm70,100.41-46.8,10-3.33-15.87L212.67,182,216,197.85C216,197.91,216,197.94,216,197.94ZM104,32H56A16,16,0,0,0,40,48V208a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V48A16,16,0,0,0,104,32ZM56,48h48V64H56Zm48,160H56V192h48v16Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
    >
      {/* versi outline sederhana (fallback biar konsisten style) */}
      <rect x="56" y="32" width="48" height="192" rx="8" />
      <line x1="56" y1="64" x2="104" y2="64" />
      <line x1="56" y1="192" x2="104" y2="192" />

      <rect x="140" y="40" width="48" height="160" rx="8" transform="rotate(-12 164 120)" />
    </svg>
  );

/* SERVICES (PLUS) */
export const IconService = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M128 40a8 8 0 0 1 8 8v72h72a8 8 0 0 1 0 16h-72v72a8 8 0 0 1-16 0v-72H48a8 8 0 0 1 0-16h72V48a8 8 0 0 1 8-8z" />
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <line x1="128" y1="48" x2="128" y2="208" />
      <line x1="48" y1="128" x2="208" y2="128" />
    </svg>
  )

/* WORK */
export const IconWork = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M216 56H40a16 16 0 0 0-16 16v96h208V72a16 16 0 0 0-16-16zM16 176v16a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-16z" />
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <rect x="32" y="56" width="192" height="120" rx="16" />
      <line x1="16" y1="176" x2="240" y2="176" />
    </svg>
  )

/* CONTACT */
export const IconContact = ({ className, filled }: IconProps) =>
  filled ? (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="currentColor"
    >
      <path d="M231.88,175.08A56.26,56.26,0,0,1,176,224C96.6,224,32,159.4,32,80A56.26,56.26,0,0,1,80.92,24.12a16,16,0,0,1,16.62,9.52l21.12,47.15,0,.12A16,16,0,0,1,117.39,96c-.18.27-.37.52-.57.77L96,121.45c7.49,15.22,23.41,31,38.83,38.51l24.34-20.71a8.12,8.12,0,0,1,.75-.56,16,16,0,0,1,15.17-1.4l.13.06,47.11,21.11A16,16,0,0,1,231.88,175.08Z" />
    </svg>
  ) : (
    <svg
      viewBox="0 0 256 256"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="16"
    >
      <circle cx="128" cy="120" r="96" />
      <line x1="128" y1="120" x2="128" y2="160" />
      <circle cx="128" cy="88" r="8" />
    </svg>
  );

