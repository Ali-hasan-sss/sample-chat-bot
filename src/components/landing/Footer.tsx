"use client";

import Image from "next/image";
import Link from "next/link";
import { FadeInUp } from "./motion";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#EFEFEF] py-16 px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeInUp>
          <div className="footer-content grid gap-10 sm:grid-cols-3 text-sm text-[#6B6B6B]">
            <div className="footer-address">
              <p className="font-medium text-[#2B2B2B] mb-2">
                FU Management S.à r.l. (Holding)
              </p>
              <p className="leading-relaxed">
                33 rue du Puits Romain
                <br />
                L-8070 Bertrange
                <br />
                Luxembourg
              </p>
            </div>

            <div className="footer-logo flex flex-col items-center sm:items-start text-center sm:text-left">
              <Image
                src="/logo.svg"
                alt="FU.life Logo"
                width={36}
                height={70}
                className="h-14 w-auto mb-3"
              />
              <p className="copyright text-xs">
                © {new Date().getFullYear()} by FU.Life
              </p>
            </div>

            <div className="footer-links sm:text-right">
              <p className="font-medium text-[#2B2B2B] mb-2">Legal</p>
              <p>
                <Link href="https://fu.life/imprint" className="hover:text-[#F15A24]">
                  Imprint
                </Link>
              </p>
              <p>
                <Link href="https://fu.life/privacy-policy" className="hover:text-[#F15A24]">
                  Privacy Policy
                </Link>
              </p>
              <p>
                <Link href="https://fu.life/terms-and-conditions" className="hover:text-[#F15A24]">
                  Terms and Conditions
                </Link>
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </footer>
  );
}
