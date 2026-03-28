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

/** Deterministic avatar background colour based on reviewer name. */
const AVATAR_PALETTE = [
  "#4285F4", // Google Blue
  "#EA4335", // Google Red
  "#34A853", // Google Green
  "#FBBC04", // Google Yellow
  "#00897B", // Teal
  "#E91E63", // Pink
  "#9C27B0", // Purple
  "#FF5722", // Deep Orange
  "#795548", // Brown
  "#607D8B", // Blue-Grey
];

function getAvatarColor(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return AVATAR_PALETTE[0];
  const code = trimmed.charCodeAt(0);
  return AVATAR_PALETTE[code % AVATAR_PALETTE.length];
}

/** Inline Google "G" logo SVG. */
function GoogleGLogo() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC04"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
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

  const shell = isGoogle
    ? "min-h-[360px] border border-slate-200 !bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:min-h-[400px]"
    : "border-primary/10 bg-gradient-to-br from-white to-accent shadow-sm";

  return (
    <Card
      className={`gap-0 flex min-h-0 flex-col rounded-2xl transition-shadow duration-300 ${isGoogle ? "p-5 sm:p-6" : "p-8 shadow-sm"} hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)] ${shell} ${isGoogle ? "h-full max-h-full" : "h-full"} ${className}`}
    >
      {isGoogle ? (
        <>
          {/* Google-style header: circular avatar + name/date + Google logo */}
          <div className="mb-3 flex items-center gap-3">
            {/* Circular avatar */}
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-semibold text-white select-none"
              style={{ backgroundColor: avatarColor }}
            >
              {initials[0]}
            </div>
            {/* Name + date */}
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-snug text-slate-900">
                {name}
              </div>
              {date && (
                <div className="text-[12px] leading-tight text-slate-500">{date}</div>
              )}
            </div>
            {/* Google G logo */}
            <div className="shrink-0">
              <GoogleGLogo />
            </div>
          </div>

          {/* Stars */}
          <div className="mb-4 flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-[18px] w-[18px] shrink-0 ${
                  i < rating
                    ? "fill-[#FBBC04] text-[#FBBC04]"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <>
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
        </>
      )}

      <div
        className={
          isGoogle
            ? "flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain"
            : "flex min-h-0 flex-1 flex-col"
        }
      >
        <p
          className={
            isGoogle
              ? "mb-0 text-left text-[14px] leading-relaxed text-slate-700 sm:text-[14px]"
              : "mb-0 text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          }
        >
          {isGoogle ? text : `"${text}"`}
        </p>
      </div>

      {!hideMeta && service && (
        <div
          className={`flex shrink-0 items-center gap-3 border-t pt-3 ${
            isGoogle ? "mt-4 border-slate-100" : "mt-6 border-border justify-between"
          }`}
        >
          <span
            className={
              isGoogle
                ? "inline-block max-w-full truncate rounded-full bg-sky-50 px-3 py-1 text-[12px] font-medium text-sky-700"
                : "inline-block max-w-[58%] truncate rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            }
          >
            {service}
          </span>
          {!isGoogle && date && (
            <div className="flex shrink-0 items-center gap-1 whitespace-nowrap text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 shrink-0" />
              <span>{date}</span>
            </div>
          )}
        </div>
      )}
      {!hideMeta && !service && !isGoogle && date && (
        <div className="mt-6 flex shrink-0 items-center justify-end gap-1 border-t border-border pt-4 text-sm text-muted-foreground">
          <Calendar className="h-3 w-3 shrink-0" />
          <span>{date}</span>
        </div>
      )}
    </Card>
  );
}
