import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Benefits", href: "#benefits" },
    { label: "FAQ", href: "#faq" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-background/50">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <span className="text-primary font-bold text-sm">HM</span>
              </div>
              <span className="font-semibold text-lg">HotelMind</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered hospitality technology that elevates guest experiences
              and reduces operational costs.
            </p>
          </div>

          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} HotelMind. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
