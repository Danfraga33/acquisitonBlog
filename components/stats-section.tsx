import { useEffect, useRef } from "react";
import { SEARCH_START_DATE } from "./data";

function getMonthsSearching() {
  const now = new Date();
  const years = now.getFullYear() - SEARCH_START_DATE.getFullYear();
  const months = now.getMonth() - SEARCH_START_DATE.getMonth();
  return Math.max(0, years * 12 + months);
}

type StatsMap = Record<string, number>;

export function StatsSection({ stats }: { stats: StatsMap }) {
  const sectionRef = useRef<HTMLElement>(null);

  const allStats = [
    { value: String(getMonthsSearching()), label: "Months Searching" },
    { value: String(stats.deals_reviewed ?? 0), label: "Deals Reviewed" },
    { value: String(stats.lois_submitted ?? 0), label: "LOIs Submitted" },
    { value: String(stats.businesses_under_review ?? 0), label: "Businesses Under Review" },
    { value: String(stats.acquisitions ?? 0), label: "No. Acquisitions" },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;
    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const numberEls = el.querySelectorAll<HTMLElement>("[data-count]");
        const labelEls = el.querySelectorAll<HTMLElement>("[data-label]");

        gsap.set([...numberEls, ...labelEls], { opacity: 0, y: 30 });

        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            numberEls.forEach((numEl, i) => {
              const target = parseInt(numEl.dataset.count || "0", 10);
              const obj = { val: 0 };

              gsap.to(numEl, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: i * 0.1,
                ease: "power2.out",
              });

              gsap.to(obj, {
                val: target,
                duration: 1.5,
                delay: i * 0.1,
                ease: "power2.out",
                onUpdate: () => {
                  numEl.textContent = String(Math.round(obj.val));
                },
              });
            });

            gsap.to(labelEls, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              delay: 0.2,
              ease: "power2.out",
            });
          },
        });

        cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
      }),
    );

    return () => cleanup?.();
  }, []);

  return (
    <section ref={sectionRef} className="border-border border-y px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
          {allStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                data-count={stat.value}
                className="text-primary mb-2 font-serif text-5xl md:text-6xl"
              >
                0
              </p>
              <p
                data-label
                className="text-muted-foreground text-sm tracking-wide uppercase"
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
