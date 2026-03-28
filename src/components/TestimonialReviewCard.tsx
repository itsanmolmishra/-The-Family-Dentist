import { Star, Calendar } from "lucide-react";
import { Card } from "./ui/card";

export type TestimonialReviewCardProps = {
  name: string;
  text: string;
  rating: number;
  service?: string;
  date?: string;
  hideMeta?: boolean;
  visualVariant?: "default" | "google";
  className?: string;
};

/** Deterministic avatar background color from name (matches Google's letter-avatar palette) */
function getAvatarColor(name: string): string {
  const palette = [
    "#1a73e8", // Google blue
    "#ea4335", // Google red
    "#34a853", // Google green
    "#fbbc04", // Google yellow
    "#9c27b0", // purple
    "#00897b", // teal
    "#e91e63", // pink
    "#f57c00", // orange
  ];
  let hash = 0;
  // Polynomial rolling hash (prime 31) for a deterministic, well-distributed
  // color assignment that gives each reviewer name a consistent avatar color.
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) & 0xffffffff;
  }
  return palette[Math.abs(hash) % palette.length];
}

/** Google "G" logo as an inline SVG */
function GoogleGLogo({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="Google"
      role="img"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export function TestimonialReviewCard({
  name,
  text,
  rating,
  service,
  date,
  hideMeta = false,
  visualVariant = "default",
  className = "",
}: TestimonialReviewCardProps) {
  const isGoogle = visualVariant === "google";

  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatarColor = getAvatarColor(name);

  if (isGoogle) {
    return (
      <Card
        className={`gap-0 flex min-h-0 h-full max-h-full flex-col rounded-2xl !bg-white border border-[#e0e0e0] shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-shadow duration-300 hover:shadow-[0_2px_6px_2px_rgba(60,64,67,0.15),0_1px_2px_0_rgba(60,64,67,0.3)] min-h-[360px] sm:min-h-[400px] p-5 sm:p-6 ${className}`}
      >
        {/* Header: avatar + name/meta + Google logo */}
        <div className="mb-3 flex items-start gap-3">
          {/* Avatar circle */}
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[15px] font-medium text-white select-none"
            style={{ backgroundColor: avatarColor }}
            aria-hidden="true"
          >
            {initials}
          </div>

          {/* Name + reviewer label */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold leading-tight text-[#202124]">
              {name}
            </p>
            <p className="text-[13px] leading-tight text-[#70757a]">Google reviewer</p>
          </div>

          {/* Google G logo */}
          <div className="shrink-0 mt-0.5">
            <GoogleGLogo size={20} />
          </div>
        </div>

        {/* Stars + date */}
        <div className="mb-3 flex items-center gap-2">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => {
              const filled = i < rating;
              const starColor = filled ? "fill-[#fbbc04] text-[#fbbc04]" : "fill-[#e0e0e0] text-[#e0e0e0]";
              return (
                <Star
                  key={i}
                  className={`h-[18px] w-[18px] shrink-0 ${starColor}`}
                />
              );
            })}
          </div>
          {date && (
            <span className="text-[13px] text-[#70757a]">{date}</span>
          )}
        </div>

        {/* Review text */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
          <p className="text-[14px] leading-[1.6] text-[#3c4043]">
            {text}
          </p>
        </div>

        {/* Service tag (optional) */}
        {!hideMeta && service && (
          <div className="mt-4 border-t border-[#e0e0e0] pt-3">
            <span className="inline-block rounded-full bg-[#e8f0fe] px-3 py-1 text-[13px] font-medium text-[#1a73e8]">
              {service}
            </span>
          </div>
        )}
      </Card>
    );
  }

  return (
    <Card
      className={`gap-0 flex min-h-0 flex-col rounded-2xl transition-shadow duration-300 p-8 shadow-sm hover:shadow-[0_14px_32px_-8px_rgba(15,23,42,0.14)] border-primary/10 bg-gradient-to-br from-white to-accent h-full ${className}`}
    >
      <div className="mb-3 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/15 text-lg font-semibold text-primary">
          {initials}
        </div>
        <div className="min-w-0 text-lg font-semibold leading-tight text-foreground">{name}</div>
      </div>
      <div className="mb-6 flex items-center gap-1">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="h-5 w-5 shrink-0 fill-secondary text-secondary" />
        ))}
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <p className="mb-0 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
          &quot;{text}&quot;
        </p>
      </div>

      {!hideMeta && (service || date) && (
        <div className="mt-6 flex shrink-0 items-center justify-between gap-3 border-t border-border pt-4">
          {service ? (
            <span className="inline-block max-w-[58%] truncate rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              {service}
            </span>
          ) : (
            <span />
          )}
          <div className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm text-muted-foreground">
            {date ? (
              <>
                <Calendar className="h-3 w-3 shrink-0" />
                <span>{date}</span>
              </>
            ) : null}
          </div>
        </div>
      )}
    </Card>
  );
}
