import { Link } from "react-router";
import { EXPLORE_PAGES } from "./data";

export function Footer() {
  return (
    <footer className="border-border border-t px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="text-muted-foreground mb-3 text-sm tracking-[0.3em] uppercase">
              Closing Notes
            </p>
            <p className="max-w-xs text-xs leading-relaxed text-white">
              Documenting every step of the path to business ownership —
              unfiltered.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-muted-foreground mb-4 text-xs tracking-[0.3em] uppercase">
              Topics
            </p>
            <ul className="space-y-2">
              {EXPLORE_PAGES.map((page) => (
                <li key={page.title}>
                  <Link
                    to={page.href}
                    className="text-foreground/60 hover:text-primary text-sm transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-muted-foreground mb-4 text-xs tracking-[0.3em] uppercase">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/#contact"
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                >
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-foreground/60 hover:text-primary text-sm transition-colors"
                >
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-xs tracking-[0.4em] uppercase">
            © 2026 Closing Notes
          </p>
          <p className="text-muted-foreground/50 text-xs">
            The Acquisition Journey
          </p>
        </div>
      </div>
    </footer>
  );
}
