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

  const shell = isGoogle
    ? "min-h-[360px] border-slate-200/90 !bg-white shadow-[0_12px_28px_-6px_rgba(15,23,42,0.12),0_4px_8px_-4px_rgba(15,23,42,0.06)] sm:min-h-[400px]"
    : "border-primary/10 bg-gradient-to-br from-white to-accent shadow-sm";

  return (
    <Card
      className={`gap-0 flex min-h-0 flex-col rounded-2xl transition-shadow duration-300 ${isGoogle ? "p-7 sm:p-8" : "p-8 shadow-sm"} hover:shadow-[0_14px_32px_-8px_rgba(15,23,42,0.14)] ${shell} ${isGoogle ? "h-full max-h-full" : "h-full"} ${className}`}
    >
      {isGoogle ? (
        <>
          <div className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <span className="shrink-0 text-[17px] font-bold leading-none tracking-tight text-sky-600">
              {initials}
            </span>
            <span className="min-w-0 text-[17px] font-bold leading-snug text-slate-900">{name}</span>
          </div>
          <div className="mb-5 flex items-center gap-0.5">
            {[...Array(rating)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 shrink-0 fill-amber-400 text-amber-400"
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
              ? "mb-0 text-left text-[15px] leading-relaxed text-slate-800 sm:text-[15px]"
              : "mb-0 text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          }
        >
          &quot;{text}&quot;
        </p>
      </div>

      {!hideMeta && (service || date) && (
        <div
          className={`flex shrink-0 items-center justify-between gap-3 border-t border-slate-200 pt-4 ${
            isGoogle ? "mt-auto" : "mt-6 border-border"
          }`}
        >
          {service ? (
            <span
              className={
                isGoogle
                  ? "inline-block max-w-[58%] truncate rounded-full bg-sky-50 px-3.5 py-1.5 text-sm font-medium text-sky-700"
                  : "inline-block max-w-[58%] truncate rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              }
            >
              {service}
            </span>
          ) : (
            <span />
          )}
          <div
            className={`flex shrink-0 items-center gap-1 whitespace-nowrap text-sm ${
              isGoogle ? "text-slate-600" : "text-muted-foreground"
            }`}
          >
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
