import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/bg-lakehouse.avif")' }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Bottom fade into next section bg-secondary/30 */}
      <div className="absolute right-0 bottom-0 left-0 h-64 bg-gradient-to-b from-transparent to-black" />
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm tracking-[0.3em] uppercase">
          A Personal Chronicle
        </p>
        <h1 className="mb-8 font-serif text-5xl leading-[1.1] md:text-7xl lg:text-8xl">
          The Acquisition
          <br />
          <span className="text-primary">Journey</span>
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-white md:text-xl">
          Documenting every step of my path to business ownership. From deal
          sourcing to due diligence, negotiations to closing - the unfiltered
          story of acquiring a company.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="#about"
            className="bg-primary text-primary-foreground rounded-full px-8 py-3 text-sm tracking-wide transition-opacity hover:opacity-90"
          >
            Start Reading
          </Link>
          <Link
            to="#posts"
            className="border-border hover:bg-accent rounded-full border px-8 py-3 text-sm tracking-wide transition-colors"
          >
            Latest Posts
          </Link>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          className="text-muted-foreground h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
}
