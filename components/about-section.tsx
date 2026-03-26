import { Link } from "react-router";
import { useScrollFadeUp } from "../lib/useScrollFadeUp";

export function AboutSection() {
  const ref = useScrollFadeUp<HTMLElement>();

  return (
    <section
      ref={ref}
      id="about"
      className="bg-secondary/30 relative px-6 py-24 md:py-32"
    >
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-24 bg-gradient-to-b from-black to-transparent" />
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <p
              data-animate
              className="text-muted-foreground mb-4 text-sm tracking-[0.3em] uppercase"
            >
              About This Journey
            </p>
            <h2
              data-animate
              className="text-foreground mb-6 font-serif text-3xl leading-tight text-balance md:text-5xl"
            >
              Building wealth through
              <br />
              <span className="text-primary">acquisition</span>
            </h2>
          </div>

          <div>
            <p
              data-animate
              className="text-muted-foreground text-lg leading-relaxed"
            >
              Always knew I'd own something. This blog is the record of actually
              doing it - the search for the right business, the deals that
              didn't work out, and everything I'm learning along the way.
            </p>
            <p
              data-animate
              className="text-muted-foreground mt-6 leading-relaxed"
            >
              No guru playbook. Just honest, in-the-moment writing from someone
              figuring out what it actually takes to buy and run a small
              software business.
            </p>
            <div data-animate className="pt-4">
              <Link
                to="#posts"
                className="text-primary inline-flex items-center gap-2 underline-offset-4 hover:underline hover:transition-all hover:duration-300"
              >
                Read the latest updates
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
