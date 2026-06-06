"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { FU_BOOK_URL } from "@/lib/fulife-theme";

const NAV_ITEMS = [
  { href: "#home", label: "home" },
  {
    href: "#rooms",
    label: "fu.life berlin",
    sub: "Ku'damm 69 | 10707 Berlin",
    links: [
      {
        href: FU_BOOK_URL,
        label: "book your stay now",
        external: true,
        mint: true,
      },
      { href: "#amenities", label: "what's included?" },
      { href: "#faq", label: "FAQ" },
    ],
  },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-5 py-4 transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 sm:px-8 md:px-10 lg:px-12",
          scrolled
            ? "site-header--scrolled"
            : "border-transparent bg-transparent"
        )}
      >
        <a
          href="https://fu.life/"
          id="logo"
          className="block shrink-0"
        >
          <Image
            src="/logo.svg"
            alt="FU.life Logo"
            width={50}
            height={100}
            priority
            className="block h-[42px] w-auto sm:h-[46px] md:h-[50px]"
          />
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href="#"
            id="nav-trigger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen((o) => !o);
            }}
            className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center no-underline sm:h-[64px] sm:w-[64px] md:h-[72px] md:w-[72px]"
          >
            <span
              className={cn(
                "nav-slogan-spin pointer-events-none absolute inset-0 flex items-center justify-center",
                menuOpen && "nav-slogan-spin--paused"
              )}
              aria-hidden
            >
              <Image
                id="nav-slogan"
                src="/nav-slogan-en.svg"
                alt=""
                width={100}
                height={100}
                className="block h-full w-full"
              />
            </span>
            <span
              id="nav-trigger-bars"
              className={cn(
                "nav-trigger-bars relative z-10",
                menuOpen && "nav-trigger-bars--open"
              )}
            />
          </a>

          <ul
            id="langswitch"
            className="m-0 flex list-none items-center gap-2 p-0 sm:gap-3"
          >
            <li className="navbtn-mint">
              <a
                href={FU_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block whitespace-nowrap rounded-full bg-[#7D99AA] px-3 py-1.5 text-[11px] font-medium text-white no-underline transition-opacity hover:opacity-90 sm:px-4 sm:py-2 sm:text-[13px]"
              >
                book your stay now
              </a>
            </li>
            <li>
              <a
                href="https://fu.life/de/"
                className="de text-sm font-semibold text-[#2B2B2B] no-underline hover:opacity-70"
              >
                DE
              </a>
            </li>
          </ul>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="navigation-backdrop fixed inset-0 z-[60] bg-black/35"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              id="navigation-wrapper"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-[420px] flex-col overflow-y-auto bg-white p-8 pb-8 pt-[calc(var(--site-header-height)+1.5rem)] shadow-[-8px_0_40px_rgba(0,0,0,0.12)]"
            >
              <nav id="navigation">
                <ul className="m-0 list-none p-0">
                  {NAV_ITEMS.map((item) => (
                    <li
                      key={item.href}
                      className={cn("mb-6", item.links && "stripes")}
                    >
                      <a
                        href={item.href}
                        className={cn(
                          "text-lg text-[#2B2B2B] no-underline",
                          item.links && "main-link"
                        )}
                        onClick={() => !item.links && setMenuOpen(false)}
                      >
                        {item.label}
                        {item.sub && (
                          <span className="mt-1 block text-xs text-[#6B6B6B]">
                            {item.sub}
                          </span>
                        )}
                      </a>
                      {item.links && (
                        <div className="secondary-links mt-4 flex flex-col gap-2">
                          {item.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.href}
                              className={cn(
                                "navbtn rounded-full px-4 py-2.5 text-center text-sm no-underline",
                                link.mint
                                  ? "mint bg-[#7D99AA] text-white"
                                  : "outline border border-[#2B2B2B] text-[#2B2B2B]"
                              )}
                              target={link.external ? "_blank" : undefined}
                              rel={
                                link.external
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div id="copyright" className="mt-auto pt-8 text-xs text-[#9B9B9B]">
                <p>© {new Date().getFullYear()} by FU.Life</p>
              </div>
              <div
                id="secondary-navigation"
                className="flex flex-col gap-2 pt-4 text-[13px]"
              >
                <a
                  href="https://fu.life/imprint"
                  className="text-[#6B6B6B] no-underline hover:text-[#F15A24]"
                >
                  Imprint
                </a>
                <a
                  href="https://fu.life/privacy-policy"
                  className="text-[#6B6B6B] no-underline hover:text-[#F15A24]"
                >
                  Privacy Policy
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
