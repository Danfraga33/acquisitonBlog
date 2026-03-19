import { Link } from "react-router";
import { EXPLORE_PAGES } from "./data";

export function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-3">
              Fraga Ventures
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xs">
              Documenting every step of the path to business ownership — unfiltered.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Topics
            </p>
            <ul className="space-y-2">
              {EXPLORE_PAGES.map((page) => (
                <li key={page.title}>
                  <Link
                    to={page.href}
                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-4">
              Connect
            </p>
            <ul className="space-y-2">
              <li>
                <Link to="/#contact" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  Get in Touch
                </Link>
              </li>
              <li>
                <Link to="/#about" className="text-sm text-foreground/60 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs tracking-[0.4em] uppercase text-muted-foreground">
            © 2026 Fraga Ventures
          </p>
          <p className="text-xs text-muted-foreground/50">
            The Acquisition Journey
          </p>
        </div>
      </div>
    </footer>
  );
}
