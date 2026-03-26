import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SEARCH_START_DATE, STATS } from "./data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function getMonthsSearching() {
  const now = new Date();
  const years = now.getFullYear() - SEARCH_START_DATE.getFullYear();
  const months = now.getMonth() - SEARCH_START_DATE.getMonth();
  return Math.max(0, years * 12 + months);
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const allStats = [
    { value: String(getMonthsSearching()), label: "Months Searching" },
    ...STATS,
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const numberEls =
      sectionRef.current.querySelectorAll<HTMLElement>("[data-count]");
    const labelEls =
      sectionRef.current.querySelectorAll<HTMLElement>("[data-label]");

    gsap.set([...numberEls, ...labelEls], { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      once: true,
      onEnter: () => {
        // Animate numbers counting up
        numberEls.forEach((el, i) => {
          const target = parseInt(el.dataset.count || "0", 10);
          const obj = { val: 0 };

          gsap.to(el, {
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
              el.textContent = String(Math.round(obj.val));
            },
          });
        });

        // Fade up labels
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

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
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
