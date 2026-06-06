"use client";

import Image from "next/image";
import {
  Calendar,
  Sofa,
  Wifi,
  Sparkles,
  Tv,
  SprayCan,
  Monitor,
  ChefHat,
  WashingMachine,
  ArrowUp,
  Dog,
} from "lucide-react";
import { FuButton } from "./FuButton";
import { FadeInUp } from "./motion";
import { SITE_IMAGES } from "@/lib/site-images";

const BENEFITS = [
  { icon: Calendar, label: "Rescheduling" },
  { icon: Sofa, label: "Fully furnished" },
  { icon: Wifi, label: "Highspeed Wifi" },
  { icon: Sparkles, label: "Towels & bedsheets" },
  { icon: Tv, label: "Smart-TV" },
  { icon: SprayCan, label: "Cleaning" },
  { icon: Monitor, label: "Workspace" },
  { icon: ChefHat, label: "Private kitchen" },
  { icon: WashingMachine, label: "Laundry room" },
  { icon: ArrowUp, label: "Elevator" },
  { icon: Dog, label: "Pets welcome" },
];

export function HeroSection() {
  return (
    <section
      id="home-kv"
      className="relative min-h-[100svh] overflow-hidden pt-[var(--site-header-height)]"
    >
      <div id="home-kv-bg" className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={SITE_IMAGES.hero}
          alt=""
          fill
          priority
          className="object-cover object-[65%_center] sm:object-[75%_center] lg:object-right"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/25 sm:from-white sm:via-white/75 sm:to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-5 pb-20 pt-10 sm:px-10 sm:pb-28 sm:pt-12 lg:pt-16">
        <div id="home-kv-text" className="max-w-2xl lg:max-w-xl xl:max-w-2xl">
          <FadeInUp>
            <h1 className="mb-8 text-[2rem] font-bold leading-[1.08] text-[#2B2B2B] sm:text-[2.5rem] lg:text-[3.25rem]">
              Your friends will love your new place so much, you might wanna
              rethink inviting them.
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.08}>
            <p className="mb-8 max-w-xl text-base leading-relaxed text-[#6B6B6B] sm:text-lg">
              Home is where the heart is. And where the stable network is. And
              where likeminded people live together in a community that will
              make you feel like living with friends you&apos;ve known forever.
              <br />
              <br />
              Oh and before we forget: Home is also where things are easy. Like
              moving in without lugging furniture.
            </p>
          </FadeInUp>

          <FadeInUp delay={0.12}>
            <a
              href="#reviews"
              className="txtbtn-outline inline-flex items-center rounded-full border border-[#2B2B2B] px-6 py-2.5 text-sm text-[#2B2B2B] transition-colors hover:bg-[#2B2B2B]/5"
            >
              ★★★★★ 4.9 | Reviews
            </a>
          </FadeInUp>
        </div>

        <FadeInUp delay={0.16} className="mt-16 lg:mt-20">
          <div id="home-kv-benefits">
            <div className="benefit-row flex flex-wrap gap-2 sm:gap-2.5">
              {BENEFITS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="benefit-item benefit-chip inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-xs text-[#2B2B2B] shadow-sm backdrop-blur-sm sm:text-sm"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#F15A24]" />
                  {label}
                </div>
              ))}
              <FuButton
                href="#amenities"
                variant="outline"
                small
                className="!rounded-full bg-white/90 backdrop-blur-sm"
              >
                even more benefits
              </FuButton>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
