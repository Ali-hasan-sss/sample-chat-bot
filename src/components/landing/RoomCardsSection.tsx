"use client";

import { FU_BOOK_URL } from "@/lib/fulife-theme";
import { SITE_IMAGES } from "@/lib/site-images";
import { FuButton } from "./FuButton";
import { SiteImage } from "./SiteImage";
import { FadeInUp } from "./motion";

const ROOMS = [
  {
    id: "fire",
    name: "Fire",
    image: SITE_IMAGES.roomFire,
    headline:
      "Temperament and temperature combined. Just like you, because you're fire.",
    desc: "Our Fire roomtype features warm colors and an energizing, cozy atmosphere.",
  },
  {
    id: "earth",
    name: "Earth",
    image: SITE_IMAGES.roomEarth,
    headline:
      "Down to earth. Down to work. Down to zen-like relaxation inside a vivid community.",
    desc: "A perfect atmosphere for studying, relaxing and focusing and whatever you need to get done.",
  },
  {
    id: "wind",
    name: "Wind",
    image: SITE_IMAGES.roomWind,
    headline:
      "Carefree living feels like a light, soothing breeze on a summer day. Or like this room.",
    desc: "An airy design and a refreshing, liberating atmosphere – everything a stressfree living needs.",
  },
  {
    id: "water",
    name: "Water",
    image: SITE_IMAGES.roomWater,
    headline:
      "Let that creativity flow in your own calming, clutterless deepthinking-space.",
    desc: "A perfect atmosphere for studying, relaxing and focusing and whatever you need to get done.",
  },
];

export function RoomCardsSection() {
  return (
    <section id="rooms" className="prime py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <div className="cards-spread grid gap-20 md:grid-cols-2 md:gap-x-12 md:gap-y-24">
          {ROOMS.map((room, i) => (
            <FadeInUp
              key={room.id}
              delay={i * 0.06}
              className={`roomcard ${i % 2 === 1 ? "md:mt-16" : ""}`}
            >
              <h4 className="text-sm font-normal mb-3">
                <span className="text-[#F15A24]">{room.name}</span>
              </h4>
              <h3 className="text-2xl sm:text-[1.75rem] font-bold text-[#2B2B2B] leading-snug mb-4">
                {room.headline}
              </h3>
              <small className="block text-sm text-[#6B6B6B] mb-6 leading-relaxed">
                {room.desc}
              </small>

              <SiteImage
                src={room.image}
                alt={`Roomtype ${room.name}`}
                className="roomcard-img aspect-[3/2] mb-6 w-full"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="centered text-center">
                <FuButton href={FU_BOOK_URL} external variant="outline" small>
                  explore <strong className="uppercase">{room.name}</strong>
                </FuButton>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp className="row center text-center mt-20 sm:mt-28">
          <FuButton href={FU_BOOK_URL} external variant="mint">
            choose your room now
          </FuButton>
        </FadeInUp>
      </div>
    </section>
  );
}
