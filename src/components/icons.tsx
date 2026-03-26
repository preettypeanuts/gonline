type IconProps = {
  className?: string
  filled?: boolean
}

/* HOME */
export const IconHome = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M128 32l96 96v88a8 8 0 0 1-8 8h-56v-64H96v64H40a8 8 0 0 1-8-8v-88z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <path d="M32 120l96-96 96 96"/>
      <path d="M40 112v96h64v-64h48v64h64v-96"/>
    </svg>
  )

/* INSIGHT */
export const IconInsight = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M224 48H32a8 8 0 0 0-8 8v144a8 8 0 0 0 8 8h128l64-64V56a8 8 0 0 0-8-8z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <rect x="32" y="48" width="192" height="160" rx="8"/>
      <line x1="64" y1="96" x2="192" y2="96"/>
      <line x1="64" y1="128" x2="160" y2="128"/>
    </svg>
  )

/* SERVICES (PLUS) */
export const IconService = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M128 40a8 8 0 0 1 8 8v72h72a8 8 0 0 1 0 16h-72v72a8 8 0 0 1-16 0v-72H48a8 8 0 0 1 0-16h72V48a8 8 0 0 1 8-8z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <line x1="128" y1="48" x2="128" y2="208"/>
      <line x1="48" y1="128" x2="208" y2="128"/>
    </svg>
  )

/* WORK */
export const IconWork = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M216 56H40a16 16 0 0 0-16 16v96h208V72a16 16 0 0 0-16-16zM16 176v16a16 16 0 0 0 16 16h192a16 16 0 0 0 16-16v-16z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <rect x="32" y="56" width="192" height="120" rx="16"/>
      <line x1="16" y1="176" x2="240" y2="176"/>
    </svg>
  )

/* CONTACT */
export const IconContact = ({ className, filled }: IconProps) =>
  filled ? (
    <svg viewBox="0 0 256 256" className={className} fill="currentColor">
      <path d="M128 24C72 24 32 64 32 120c0 48 40 88 96 88a96 96 0 0 0 96-96c0-48-40-88-96-88z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 256 256" className={className} fill="none" stroke="currentColor" strokeWidth="16">
      <circle cx="128" cy="120" r="96"/>
      <line x1="128" y1="120" x2="128" y2="160"/>
      <circle cx="128" cy="88" r="8"/>
    </svg>
  )