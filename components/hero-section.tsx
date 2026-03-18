export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">
          A Personal Chronicle
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8">
          The Acquisition
          <br />
          <span className="text-primary">Journey</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
          Documenting every step of my path to business ownership.
          From deal sourcing to due diligence, negotiations to closing —
          the unfiltered story of acquiring a company.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#about"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm tracking-wide hover:opacity-90 transition-opacity"
          >
            Start Reading
          </a>
          <a
            href="#posts"
            className="px-8 py-3 border border-border rounded-full text-sm tracking-wide hover:bg-accent transition-colors"
          >
            Latest Posts
          </a>
        </div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
