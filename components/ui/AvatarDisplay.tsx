import { AvatarStyle } from "@/lib/types";

interface AvatarDisplayProps {
  style: AvatarStyle;
  seed: string;
  size?: number;
  className?: string;
}

// Deterministic color palette from seed
function seedToColors(seed: string): [string, string, string] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 120) % 360;
  const hue3 = (hue1 + 240) % 360;
  return [
    `hsl(${hue1}, 70%, 55%)`,
    `hsl(${hue2}, 70%, 55%)`,
    `hsl(${hue3}, 70%, 55%)`,
  ];
}

function GeometricAvatar({ seed, size }: { seed: string; size: number }) {
  const [c1, c2, c3] = seedToColors(seed);
  const id = `geo-${seed}`;
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${id}-bg`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="100" height="100" fill={`url(#${id}-bg)`} />
        {/* Geometric pattern */}
        <polygon points="50,5 95,75 5,75" fill={c3} opacity="0.5" />
        <polygon points="50,95 5,25 95,25" fill={c1} opacity="0.3" />
        <circle cx="50" cy="50" r="18" fill="white" opacity="0.15" />
        <rect x="35" y="35" width="30" height="30" fill="white" opacity="0.10" transform="rotate(45 50 50)" />
      </g>
    </svg>
  );
}

function AbstractAvatar({ seed, size }: { seed: string; size: number }) {
  const [c1, c2, c3] = seedToColors(seed);
  const id = `abs-${seed}`;
  let n = 0;
  for (let i = 0; i < seed.length; i++) n += seed.charCodeAt(i);
  const cx1 = 20 + (n % 30);
  const cy1 = 20 + ((n * 3) % 30);
  const cx2 = 50 + (n % 25);
  const cy2 = 50 + ((n * 7) % 25);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${id}-bg`} cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor={c2} />
          <stop offset="100%" stopColor={c1} />
        </radialGradient>
        <clipPath id={`${id}-clip`}>
          <circle cx="50" cy="50" r="50" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id}-clip)`}>
        <rect width="100" height="100" fill={`url(#${id}-bg)`} />
        <circle cx={cx1} cy={cy1} r="35" fill={c3} opacity="0.45" />
        <circle cx={cx2} cy={cy2} r="28" fill="white" opacity="0.18" />
        <circle cx="70" cy="70" r="22" fill={c2} opacity="0.35" />
        {/* Subtle noise texture via small dots */}
        <circle cx="50" cy="50" r="8" fill="white" opacity="0.2" />
      </g>
    </svg>
  );
}

export function AvatarDisplay({ style, seed, size = 64, className = "" }: AvatarDisplayProps) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      {style === "geometric" ? (
        <GeometricAvatar seed={seed} size={size} />
      ) : (
        <AbstractAvatar seed={seed} size={size} />
      )}
    </div>
  );
}
