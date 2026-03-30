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
            className="w-[min(90vw,340px)] shrink-0 sm:w-[340px] md:w-[360px]"
          >
            <TestimonialReviewCard
              name={t.name}
              text={t.text}
              rating={t.rating}
              service={t.service}
              date={t.date}
              hideMeta={false}
              visualVariant="google"
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
