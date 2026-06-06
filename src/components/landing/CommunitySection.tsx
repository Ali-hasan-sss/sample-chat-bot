"use client";

import Image from "next/image";
import { Parallax, FadeInUp } from "./motion";
import { FuButton } from "./FuButton";
import { SiteImage } from "./SiteImage";
import { FU, FU_BOOK_URL } from "@/lib/fulife-theme";
import { SITE_IMAGES } from "@/lib/site-images";

export function KeyVisualSection() {
  return (
    <section className="keyvisual kv-allthesame relative min-h-[85vh] flex items-end overflow-hidden">
      <Image
        src={SITE_IMAGES.kitchen}
        alt="Kitchenparty"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority={false}
      />
      <div className="absolute inset-0 bg-black/25" aria-hidden />

      <div className="relative z-10 w-full py-24 sm:py-32">
        <Parallax offset={50} className="keyvisual-catchphrase mx-auto max-w-3xl px-5 sm:px-10 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-8 leading-snug drop-shadow-sm">
            Think all serviced apartments are the same? Try us now, apologize
            later.
          </h2>
          <FuButton
            href={FU_BOOK_URL}
            external
            variant="outline"
            className="!border-white !text-white hover:!bg-white/10"
          >
            let&apos;s get you started
          </FuButton>
        </Parallax>
      </div>
    </section>
  );
}

export function CommunitySection() {
  return (
    <section
      id="community"
      className="gradient-primary py-28 sm:py-40 px-5 sm:px-10"
      style={{ backgroundColor: FU.orange }}
    >
      <div className="mx-auto max-w-[900px] text-center">
        <Parallax offset={60}>
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-white mb-16 sm:mb-20 leading-snug">
            Did you ever dare to imagine co-living, but with real privacy?
          </h2>
        </Parallax>

        <div className="grid sm:grid-cols-2 gap-12 sm:gap-16 text-left mb-16 sm:mb-20">
          <FadeInUp>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              You&apos;ll be surrounded by like-minded people you instantly click
              with. A multicultural, welcoming crowd of thinkers and doers.
              It&apos;s like living with roommates you&apos;ve known forever – just
              without sharing a room. Or arguing over the dishes.
            </p>
          </FadeInUp>
          <FadeInUp delay={0.08}>
            <p className="text-white text-sm sm:text-base leading-relaxed">
              No matter how deep you want to get involved, it&apos;s your decision.
              Be active today, take it easy tomorrow. Want to enjoy the positive
              atmosphere of our community without getting too tied down?
              That&apos;s okay, too. Your pace. Every day.
            </p>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.12}>
          <FuButton href={FU_BOOK_URL} external variant="mint">
            join your new community
          </FuButton>
        </FadeInUp>
      </div>
    </section>
  );
}

export function FullWidthCatchphraseSection() {
  return (
    <section className="prime-dark fullsize-catchphrase bg-[#2B2B2B] py-16 sm:py-24 px-5 text-center">
      <p className="text-white/90 text-lg sm:text-2xl lg:text-3xl font-bold max-w-4xl mx-auto leading-snug">
        Almost too good to ever leave.
      </p>
    </section>
  );
}

export function HolidaySection() {
  return (
    <section className="w pt-20 sm:pt-28 pb-20 sm:pb-28 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <FadeInUp className="colitem p-0 lg:pr-8">
          <h2 className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#2B2B2B] mb-6 leading-snug fade-in-up">
            Where are you going to spend your holidays at, if this is how
            you&apos;re living from now on?
          </h2>
          <p className="text-[#6B6B6B] leading-relaxed mb-8 max-w-md fade-in-up">
            Choosing FU means choosing convenience. Everything&apos;s already set
            up for you, from towels to network. Settling in is so easy, you&apos;ll
            feel like going on a longterm vacation. Plus you get all the comforts
            of room service, but without having to leave anytime soon.
          </p>
          <FuButton href={FU_BOOK_URL} external variant="mint">
            start living like this in Berlin
          </FuButton>
        </FadeInUp>

        <Parallax offset={90} className="colitem relative">
          <SiteImage
            src={SITE_IMAGES.collage}
            alt="Collage"
            className="shift-right-up aspect-[727/1061] w-full max-w-md mx-auto lg:ml-auto"
            imageClassName="object-contain bg-[#EFEFEF]"
            sizes="(max-width: 1024px) 90vw, 480px"
          />
        </Parallax>
      </div>
    </section>
  );
}
