import { useState } from "react";
import { EXPLORE_PAGES } from "./data";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <header className="flex items-center gap-8 px-8 py-4 bg-card/80 backdrop-blur-md border border-border rounded-full shadow-2xl">
        <a href="#" className="text-sm tracking-wide hover:text-primary transition-colors">
          Home
        </a>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm tracking-wide hover:text-primary transition-colors"
          >
            Explore
            <svg
              className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 py-2 bg-card border border-border rounded-lg shadow-xl">
              {EXPLORE_PAGES.map((page) => (
                <a
                  key={page.href}
                  href={page.href}
                  className="block px-4 py-2 text-sm hover:bg-accent hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {page.title}
                </a>
              ))}
            </div>
          )}
        </div>
        <a href="#contact" className="text-sm tracking-wide hover:text-primary transition-colors">
          Contact
        </a>
      </header>
    </div>
  );
}
