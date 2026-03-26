import { useEffect, useRef } from "react";

export function useScrollFadeUp<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    let cleanup: (() => void) | undefined;

    import("gsap").then(({ gsap }) =>
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const el = ref.current;
        if (!el) return;

        const children = el.querySelectorAll("[data-animate]");
        const targets = children.length > 0 ? Array.from(children) : [el];

        gsap.set(targets, { opacity: 0, y: 40 });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        });

        cleanup = () => ScrollTrigger.getAll().forEach((t) => t.kill());
      }),
    );

    return () => cleanup?.();
  }, []);

  return ref;
}
