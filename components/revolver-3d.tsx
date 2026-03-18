import { useEffect, useRef, useState, useCallback } from "react";
import { REVOLVER_ITEMS } from "./data";

export function Revolver3D() {
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelCooldown = useRef(false);
  const count = REVOLVER_ITEMS.length;
  const anglePerItem = 360 / count;
  const radius = 150;

  const activeIndex = ((step % count) + count) % count;

  const advance = useCallback((dir: 1 | -1) => {
    if (wheelCooldown.current) return;
    wheelCooldown.current = true;
    setStep((prev) => prev + dir);
    setTimeout(() => {
      wheelCooldown.current = false;
    }, 650);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (Math.abs(e.deltaY) > 5) {
        advance(e.deltaY > 0 ? 1 : -1);
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  const rotation = -step * anglePerItem;

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full flex items-center justify-center"
      style={{ perspective: "1000px" }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "80px",
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotation}deg)`,
          transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {REVOLVER_ITEMS.map((item, i) => {
          const itemAngle = i * anglePerItem;
          let dist = Math.abs(i - activeIndex);
          if (dist > count / 2) dist = count - dist;
          const isActive = dist === 0;
          const isNear = dist === 1;
          const isVisible = dist <= 2;

          const scale = isActive ? 1.2 : isNear ? 0.8 : 0.55;
          const opacity = isActive ? 1 : isNear ? 0.45 : isVisible ? 0.18 : 0.05;
          const fontSize = isActive ? "3.5rem" : isNear ? "1.15rem" : "1rem";

          return (
            <div
              key={item.num}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transformStyle: "preserve-3d",
                transform: `rotateX(${itemAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <div
                className="text-center cursor-pointer whitespace-nowrap"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  transition: "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease",
                  transformOrigin: "center center",
                }}
                onClick={() => setStep(i)}
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1 block">
                  {item.num}
                </span>
                <h3
                  className="font-serif tracking-tight leading-none"
                  style={{
                    fontSize,
                    transition: "font-size 0.8s cubic-bezier(0.23, 1, 0.32, 1), color 0.5s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "rgb(148 163 184)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                >
                  {item.label}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
