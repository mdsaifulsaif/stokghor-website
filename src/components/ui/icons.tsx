import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number, p: P) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
  ...p,
});

export const Check = ({ size = 14, strokeWidth = 3.2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="m5 12 5 5 9-10" />
  </svg>
);

export const Arrow = ({ size = 18, strokeWidth = 2.4, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Cube = ({ size = 22, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="m3 13 9 5 9-5" />
  </svg>
);

export const Chat = ({ size = 16, strokeWidth = 2.4, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.7-5.2A8.5 8.5 0 1 1 21 12Z" />
  </svg>
);

export const Warn = ({ size = 16, strokeWidth = 2.4, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M12 8v5M12 17h.01" />
    <path d="M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
  </svg>
);

export const Bell = ({ size = 16, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10 21h4" />
  </svg>
);

export const Grid4 = ({ size = 22, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);

export const Doc = ({ size = 22, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
);

export const Wallet = ({ size = 22, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M3 7a2 2 0 0 1 2-2h13v4" />
    <path d="M3 7v11a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1H5a2 2 0 0 1-2-2Z" />
    <circle cx="16.5" cy="14" r="1.2" />
  </svg>
);

export const Shield = ({ size = 22, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const Calendar = ({ size = 18, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const Receipt = ({ size = 18, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 7h8M8 11h2M12 11h2M8 15h8" />
  </svg>
);

export const Box = ({ size = 18, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
    <path d="M3 8v8l9 5 9-5V8" />
  </svg>
);

export const BarsIcon = ({ size = 18, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

export const Phone = ({ size = 19, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </svg>
);

export const Mail = ({ size = 19, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const Video = ({ size = 19, strokeWidth = 2, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m10 9 5 3-5 3V9Z" />
  </svg>
);

export const ArrowUp = ({ size = 14, strokeWidth = 2.4, ...p }: P) => (
  <svg {...base(size, { strokeWidth, ...p })}>
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);
