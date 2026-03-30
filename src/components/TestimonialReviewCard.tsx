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
  visualVariant = "google",
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
    ? "rounded-3xl border p-8 sm:p-10"
    : "rounded-2xl bg-[#f8fbfd] border border-[#e5eef5] shadow-[0_4px_24px_-4px_rgba(14,107,168,0.08)] p-6 sm:p-7 hover:shadow-[0_8px_32px_-6px_rgba(14,107,168,0.12)] transition-shadow duration-300";

  const googleCardStyle = isGoogle
    ? {
        backgroundColor: "#e6eef5",
        borderColor: "#c7d8e4",
        boxShadow: "0 4px 12px -6px rgba(15,73,116,0.22)",
        minHeight: "300px",
      }
    : undefined;

  return (
    <Card
      className={`gap-0 flex min-h-0 flex-col h-full ${cardClasses} ${className}`}
      style={googleCardStyle}
    >
      {/* Header with initials and name */}
      <div className="flex items-start gap-4 mb-4">
        <span
          className={`text-xl font-bold tracking-tight shrink-0 ${
            isGoogle ? "" : "text-primary"
          }`}
          style={isGoogle ? { color: "#0d70b1" } : undefined}
        >
          {initials}
        </span>
        <div className="flex flex-col min-w-0">
          <span
            className={`leading-snug font-semibold ${
              isGoogle ? "text-[22px]" : "text-slate-800 text-lg"
            }`}
            style={isGoogle ? { color: "#0f2942" } : undefined}
          >
            {name}
          </span>
          <div className="flex items-center gap-1 mt-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-[22px] w-[22px] shrink-0"
                style={
                  i < rating
                    ? { color: "#f4c12f", fill: "#f4c12f" }
                    : { color: "#c7d2df", fill: "#c7d2df" }
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial text */}
      <div className="flex-1 mt-7">
        <p
          className={`text-[18px] leading-[1.8] ${
            isGoogle ? "text-[18px] leading-[1.58]" : "text-slate-600"
          }`}
          style={isGoogle ? { color: "#102c46" } : undefined}
        >
          &quot;{text}&quot;
        </p>
      </div>

      {/* Footer with service tag and date */}
      {!hideMeta && (service || date) && (
        <div
          className={`flex shrink-0 items-center justify-between gap-3 pt-5 mt-6 ${
            isGoogle ? "border-t" : "border-t border-slate-200/80"
          }`}
          style={isGoogle ? { borderTopColor: "#cde0ec" } : undefined}
        >
          {service ? (
            <span
              className={`inline-block rounded-full px-6 py-2 text-[15px] font-semibold ${
                isGoogle
                  ? "border"
                  : "border border-primary/30 bg-white text-primary"
              }`}
              style={
                isGoogle
                  ? {
                      backgroundColor: "#cfe1ee",
                      color: "#0b68a5",
                      borderColor: "#c6dbe8",
                    }
                  : undefined
              }
            >
              {service}
            </span>
          ) : (
            <span />
          )}
          {date && (
            <div
              className={`flex shrink-0 items-center gap-2 whitespace-nowrap text-[15px] ${
                isGoogle ? "" : "text-slate-500"
              }`}
              style={isGoogle ? { color: "#0f2942" } : undefined}
            >
              <Calendar
                className="h-[17px] w-[17px] shrink-0"
                style={isGoogle ? { color: "#0f2942" } : undefined}
              />
              <span>{date}</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
