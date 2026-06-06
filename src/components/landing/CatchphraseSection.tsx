"use client";

import { SiteImage } from "./SiteImage";
import { Parallax, FadeInUp } from "./motion";
import { SITE_IMAGES } from "@/lib/site-images";

export function CatchphraseSection() {
  return (
    <section className="prime catchphrase relative py-28 sm:py-40 bg-white overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-10">
        <Parallax
          offset={80}
          direction="down"
          className="catchphrase-center text-center max-w-4xl mx-auto mb-16 sm:mb-24"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[2.5rem] font-bold text-[#2B2B2B] leading-snug">
            Buy a second pair of pyjamas before moving in – the level of
            convenience here is just too good to ever leave.
          </h2>
        </Parallax>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <FadeInUp className="catchphrase-img">
            <SiteImage
              src={SITE_IMAGES.girlYawning}
              alt="Cozy living"
              className="aspect-[4/5] w-full max-w-lg mx-auto grainy"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </FadeInUp>

          <Parallax offset={100} direction="down" className="vertical-video">
            <SiteImage
              src={SITE_IMAGES.catchphraseVideo}
              alt="FU.life living"
              className="aspect-[9/14] w-full max-w-[300px] mx-auto lg:mr-0 lg:ml-auto shadow-lg"
              sizes="300px"
            />
          </Parallax>
        </div>
      </div>
    </section>
  );
}
