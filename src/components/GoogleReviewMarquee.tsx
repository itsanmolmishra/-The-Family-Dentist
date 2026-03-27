import { TestimonialReviewCard } from "./TestimonialReviewCard";
import { googleReviewTestimonials } from "../data/googleReviewTestimonials";

export function GoogleReviewMarquee() {
  const items = googleReviewTestimonials;
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-2">
      <div className="flex w-max items-stretch gap-8 animate-marquee-google-reviews hover:[animation-play-state:paused]">
        {track.map((t, index) => (
          <div
            key={`${t.name}-${index}`}
            className="flex h-[min(72vh,460px)] min-h-[360px] w-[min(90vw,310px)] shrink-0 flex-col sm:h-[min(74vh,480px)] sm:min-h-[400px] sm:w-[320px] md:w-[340px]"
          >
            <TestimonialReviewCard
              name={t.name}
              text={t.text}
              rating={t.rating}
              service={t.service}
              date={t.date}
              hideMeta={false}
              visualVariant="google"
              className="min-h-0 w-full flex-1"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
