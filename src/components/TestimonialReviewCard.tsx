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
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const isGoogle = visualVariant === "google";

  const cardClasses = isGoogle
    ? "rounded-[28px] bg-[#f3f9ff] border border-[#d9e8f5] shadow-[0_18px_52px_-20px_rgba(20,92,145,0.32)] p-8 sm:p-9 hover:shadow-[0_22px_60px_-22px_rgba(20,92,145,0.35)] transition-all duration-300"
    : "rounded-2xl bg-[#f8fbfd] border border-[#e5eef5] shadow-[0_4px_24px_-4px_rgba(14,107,168,0.08)] p-6 sm:p-7 hover:shadow-[0_8px_32px_-6px_rgba(14,107,168,0.12)] transition-shadow duration-300";

  return (
    <Card
      className={`gap-0 flex min-h-0 flex-col h-full ${cardClasses} ${className}`}
    >
      {/* Header with initials and name */}
      <div className="flex items-start gap-4 mb-3">
        <span
          className={`text-xl font-bold tracking-tight shrink-0 ${
            isGoogle ? "text-[#1f74b7]" : "text-primary"
          }`}
        >
          {initials}
        </span>
        <div className="flex flex-col min-w-0">
          <span
            className={`leading-snug font-semibold ${
              isGoogle ? "text-[#0b4b82] text-[22px]" : "text-slate-800 text-lg"
            }`}
          >
            {name}
          </span>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 shrink-0 ${
                  i < rating
                    ? "fill-amber-400 text-amber-400"
                    : "fill-slate-200 text-slate-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial text */}
      <div className="flex-1 mt-7">
        <p
          className={`text-[18px] leading-[1.8] ${
            isGoogle ? "text-[#1f3c55]" : "text-slate-600"
          }`}
        >
          &quot;{text}&quot;
        </p>
      </div>

      {/* Footer with service tag and date */}
      {!hideMeta && (service || date) && (
        <div
          className={`flex shrink-0 items-center justify-between gap-3 pt-6 mt-8 ${
            isGoogle ? "border-t border-[#dbe7f3]" : "border-t border-slate-200/80"
          }`}
        >
          {service ? (
            <span
              className={`inline-block rounded-full px-5 py-1.5 text-[15px] font-semibold ${
                isGoogle
                  ? "bg-[#d4e9f8] text-[#2b6fa8] border border-[#c4dff0] shadow-[0_10px_20px_-12px_rgba(57,122,171,0.55)]"
                  : "border border-primary/30 bg-white text-primary"
              }`}
            >
              {service}
            </span>
          ) : (
            <span />
          )}
          {date && (
            <div
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[15px] ${
                isGoogle ? "text-[#2f4c63]" : "text-slate-500"
              }`}
            >
              <Calendar className="h-[18px] w-[18px] shrink-0" />
              <span>{date}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
