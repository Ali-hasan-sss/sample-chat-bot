"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SiteImage } from "./SiteImage";
import { FadeInUp } from "./motion";
import { SITE_IMAGES } from "@/lib/site-images";

const SLIDES = [
  {
    title: "Fully furnished",
    text: "Think about moving without stress. All you need fitting in a suitcase or two. Anything else is on us, waiting for you to make yourself feel home instantly.",
    image: SITE_IMAGES.furnished,
    alt: "Fully furnished",
  },
  {
    title: "Co-working",
    text: "When commuting to work feels like a waste of time, feel free to use our co-working spaces. No extra cost - just extra fun and free networking on top.",
    image: SITE_IMAGES.coworking,
    alt: "Co-working",
  },
  {
    title: "Amenities",
    text: "From community-spaces for meeting likeminded people, to event spaces and a private fitness center – you'll find everything you need under one roof.",
    image: SITE_IMAGES.amenities,
    alt: "Amenities",
  },
];

export function AmenitiesSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section id="amenities" className="s airy-slider py-24 sm:py-32 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <FadeInUp>
          <div
            ref={trackRef}
            className="airy-swiper flex gap-8 sm:gap-10 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5 sm:-mx-10 sm:px-10"
          >
            {SLIDES.map((slide) => (
              <article
                key={slide.title}
                className="swiper-slide snap-start shrink-0 w-[88vw] sm:w-[460px]"
              >
                <div className="slide-content">
                  <SiteImage
                    src={slide.image}
                    alt={slide.alt}
                    className="slide-image aspect-[4/3] mb-6 w-full"
                    sizes="460px"
                  />
                  <div className="slide-text pr-4">
                    <h3 className="text-xl sm:text-2xl font-bold text-[#2B2B2B] mb-3">
                      {slide.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed">
                      {slide.text}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </FadeInUp>

        <div className="swiper-arrows flex gap-4 mt-8 justify-end">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => scroll("prev")}
            className="swiper-button-prev flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D8D8] hover:bg-[#FAFAFA] transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => scroll("next")}
            className="swiper-button-next flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D8D8] hover:bg-[#FAFAFA] transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
