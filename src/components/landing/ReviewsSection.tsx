"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FadeInUp } from "./motion";

const REVIEWS = [
  {
    name: "Jaci",
    location: "Germany",
    date: "October, 2025",
    text: "The flat was as shown and described in the pictures and very central. Everything you need was there, the flat is spotlessly clean. We were travelling with a toddler and the separation of the living/dining room and bedroom meant that going to bed early was not a problem. The additional app to get into the flat was unusual but doable.",
  },
  {
    name: "Henri",
    location: "",
    date: "October, 2025",
    text: "Good location and flexible check-in",
  },
  {
    name: "Nico",
    location: "",
    date: "September, 2025",
    text: "Spacious and bright flat in one of Berlin's most beautiful neighbourhoods. Great restaurants nearby and services of all kinds. The host was always accommodating and helpful, I highly recommend this flat to enjoy the city of Berlin in an elegant and quiet atmosphere.",
  },
  {
    name: "Lencke",
    location: "",
    date: "September, 2025",
    text: "Great location, super clean, excellent helpful communication with the host:in I had wished for a coffee in the room :) but you can bring it with you Highly recommended and we will be back.",
  },
  {
    name: "Lauren",
    location: "",
    date: "September, 2025",
    text: "I had a great stay. The flat was very clean and comfortable. Had a problem with the cooker and the host was more than helpful and moved me to another flat.",
  },
  {
    name: "Wynona",
    location: "Dublin, Ireland",
    date: "September, 2025",
    text: "Great location with lots of public transport nearby. Nice one bedroom flat with all the amenities you need and very easy check-in. Hosts are always there to answer if you need anything :)",
  },
  {
    name: "Luca",
    location: "Achern, Germany",
    date: "September, 2025",
    text: "We had a pleasant stay. The accommodation was very clean and tidy, everything looked neat and inviting. One small point of criticism: unfortunately there was no rubbish bin and no toilet brush. Otherwise everything was great and we felt very comfortable.",
  },
  {
    name: "Farah",
    location: "",
    date: "September, 2025",
    text: "I really enjoyed my stay. The flat was clean. Fully accommodated. The neighbourhood was lively and vibrant. The host was responsive and helpful.",
  },
  {
    name: "Downtown",
    location: "Tirana, Albania",
    date: "September, 2025",
    text: "The flat was perfect - beautifully furnished, very spacious and everything was spotless. It's in a great area with lots of cafes and restaurants as well as fashion shops to shop in. We really had a wonderful stay and would definitely recommend it!",
  },
  {
    name: "Anton",
    location: "Berlin, Germany",
    date: "August, 2025",
    text: "Great place, not too expensive, nice flat.",
  },
];

export function ReviewsSection() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? 360 : -360, behavior: "smooth" });
  };

  return (
    <section id="reviews" className="prime pt-24 sm:pt-32 pb-24 sm:pb-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <FadeInUp className="center mb-14 sm:mb-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B2B2B] mb-2">
            We are trusted by Airbnb
          </h2>
          <p className="text-[#6B6B6B]">★★★★★ 4.9 / 72 Reviews</p>
        </FadeInUp>

        <div
          ref={trackRef}
          className="review-slider-container flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-5 px-5 sm:-mx-10 sm:px-10"
        >
          {REVIEWS.map((review) => (
            <article
              key={review.name + review.date}
              className="review-card snap-start shrink-0 w-[320px] sm:w-[380px] rounded-none border-0 p-0 bg-transparent"
            >
              <div className="review-header mb-6 flex items-start gap-4">
                <div className="review-header-person">
                  <strong className="text-[#2B2B2B] block">{review.name}</strong>
                  {review.location && (
                    <span className="text-xs text-[#9B9B9B]">{review.location}</span>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <span className="text-[#F15A24] text-sm tracking-wider">
                  ★★★★★
                </span>
                <span className="text-xs text-[#9B9B9B] ml-2">{review.date}</span>
              </div>
              <p className="review-text text-sm text-[#6B6B6B] leading-relaxed">
                {review.text}
              </p>
            </article>
          ))}
        </div>

        <div className="swiper-arrows flex gap-4 mt-10 justify-end">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scroll("prev")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D8D8] hover:bg-[#FAFAFA]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scroll("next")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D8D8D8] hover:bg-[#FAFAFA]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
