import { useEffect, useRef, useState, useCallback } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

const REVOLVER_ITEMS = [
  { num: "01", label: "Deal Journal" },
  { num: "02", label: "Frameworks" },
  { num: "03", label: "Structured Notes" },
  { num: "04", label: "Learnings" },
  { num: "05", label: "Operator Lens" },
  { num: "06", label: "Behind the Scenes" },
];

function Revolver3D() {
  // Use a continuous step counter so rotation always increments/decrements
  // by exactly one step — no wrap-around jumps.
  const [step, setStep] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const wheelCooldown = useRef(false);
  const count = REVOLVER_ITEMS.length;
  const anglePerItem = 360 / count;
  const radius = 150;

  // Which item index is active (wraps within 0–count-1)
  const activeIndex = ((step % count) + count) % count;

  const advance = useCallback(
    (dir: 1 | -1) => {
      if (wheelCooldown.current) return;
      wheelCooldown.current = true;
      setStep((prev) => prev + dir);
      setTimeout(() => {
        wheelCooldown.current = false;
      }, 650);
    },
    []
  );

  // Wheel handler
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

  // Continuous rotation — always moves exactly anglePerItem per step
  const rotation = -step * anglePerItem;

  return (
    <div
      ref={containerRef}
      className="relative h-[500px] w-full flex items-center justify-center lg:justify-center"
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
          // Distance from active, wrapping for display purposes only
          let dist = Math.abs(i - activeIndex);
          if (dist > count / 2) dist = count - dist;
          const isActive = dist === 0;
          const isNear = dist === 1;
          const isVisible = dist <= 2;

          const scale = isActive ? 1.2 : isNear ? 0.8 : 0.55;
          const opacity = isActive ? 1 : isNear ? 0.45 : isVisible ? 0.18 : 0.05;
          const fontSize = isActive
            ? "4rem"
            : isNear
              ? "1.15rem"
              : "1rem";

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
                  transition:
                    "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease",
                  transformOrigin: "right center",
                }}
                onClick={() => setStep(i)}
              >
                <span className=" text-[10px] uppercase tracking-[0.3em] text-primary mb-1 block">
                  {item.num}
                </span>
                <h3
                  className="font-display tracking-tight leading-none"
                  style={{
                    fontSize,
                    transition:
                      "font-size 0.8s cubic-bezier(0.23, 1, 0.32, 1), color 0.5s ease",
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
      {/* Vertical accent line */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 h-3/4 w-px bg-primary/10" />
    </div>
  );
}

export function Welcome() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Fraga Ventures 3D | Acquisition Journey</title>
      <link
        href="https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <style
        dangerouslySetInnerHTML={{
          __html:
            "\n        body {\n            font-family: 'Crimson Pro', serif;\n        }\n        .hide-scrollbar::-webkit-scrollbar {\n            display: none;\n        }\n        .hide-scrollbar {\n            -ms-overflow-style: none;\n            scrollbar-width: none;\n        }\n        .text-overlay {\n            background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85));\n        }\n    ",
        }}
      />
      {/* Floating Header */}
      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <header className="flex items-center justify-center w-fit px-6 py-3 bg-slate-900/80 dark:bg-background-dark/90 backdrop-blur-md border border-slate-700/50 dark:border-primary/20 rounded-full shadow-2xl">
          <nav className="flex items-center gap-8 text-lg">
            <a
              className="font-medium tracking-widest uppercase hover:text-primary transition-colors"
              href="#"
            >
              Home
            </a>
            <a
              className="font-medium tracking-widest uppercase hover:text-primary transition-colors"
              href="#"
            >
              Pages
            </a>
            <a
              className="font-medium tracking-widest uppercase hover:text-primary transition-colors"
              href="#"
            >
              Contact
            </a>
          </nav>
        </header>
      </div>
      <main className="relative pt-32 pb-24 px-6 lg:px-52">
        {/* Hero Section */}
        <section className=" grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[716px]">
          {/* Left side: Stacked Titles */}
          <div className="flex flex-col">
            <h1 className="text-7xl md:text-9xl font-extralight leading-none tracking-tighter text-slate-400 dark:text-slate-600">
              Fraga
            </h1>
            <h1 className="text-7xl md:text-9xl leading-none tracking-tighter text-primary -mt-2">
              Ventures
            </h1>
            <h1 className="text-7xl md:text-9xl font-extralight leading-none tracking-tighter text-slate-800 dark:text-slate-200">
              3D
            </h1>
            <p className="mt-8 max-w-md text-lg text-slate-500 dark:text-slate-400 font-light leading-relaxed">
              A multi-dimensional exploration into high-stakes business
              acquisitions, operational excellence, and strategic growth
              frameworks.
            </p>
          </div>
          {/* Right side: 3D Revolver Menu */}
          <Revolver3D />
        </section>
        {/* Business Showcase */}
        <section className="my-32 flex justify-center">
          <div
            className="w-full max-w-5xl relative aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-cover bg-center"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCZoHM9gpa3DLImTpRN-rNariMA03onx7_6GMQCU2fO0rN8Yw92L0nQTaIcutR9e0Ue75CDLMF9f49Mn1-hnln7cpMbZ67XWRGYFudfjafhVIBK-NMEM9xtydwbEGgOA57q9fRp7A6DlRUUlWXuNkpBIGSMAwYQ38pQf-yoWeReIfIytY6ROjbWyv6RJPblvGzgW2a380DHObcW1JXGWx6QqjaptWlOs9t9ob2A_3_506yiV00M96A2LQpjYyquo0cWl0DU5uKSyDU")',
            }}
          >
            <div className="absolute inset-0 text-overlay flex flex-col items-center justify-center p-6 md:p-12 text-center">
              {/* Technical Metadata Left Top */}
              <div className="absolute top-4 left-4 md:top-8 md:left-8 text-[9px] md:text-[10px] text-slate-500 uppercase tracking-[0.2em] leading-relaxed text-left max-w-[140px] md:max-w-[200px] hidden md:block">
                <span className="block text-slate-400 font-bold mb-1">
                  Visualisation One
                </span>
                We've forged partnerships for over 20 years, combining our
                visual artistry with innovative technologies that evoke the
                senses.
              </div>
              {/* Technical Metadata Right Top */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 text-[8px] md:text-[9px] text-slate-500 uppercase tracking-[0.1em] md:tracking-[0.15em] text-right hidden md:grid grid-cols-2 gap-x-4 md:gap-x-8">
                <div>
                  <span className="block text-slate-400 font-bold mb-1">
                    Services
                  </span>
                  <ul className="space-y-0.5">
                    <li>CGI Creation</li>
                    <li>Animation</li>
                    <li>Virtual Reality</li>
                    <li>Augmented Reality</li>
                    <li>Media Walls</li>
                  </ul>
                </div>
                <div>
                  <span className="block text-slate-400 font-bold mb-1">
                    Offices
                  </span>
                  <ul className="space-y-0.5">
                    <li>London</li>
                    <li>New York</li>
                    <li>San Francisco</li>
                    <li>Tokyo</li>
                  </ul>
                </div>
              </div>
              {/* Central Heading */}
              <div className="relative group cursor-pointer">
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-display text-white/90 tracking-tight leading-none">
                  Visual Artistry.
                </h2>
                <div className="mt-3 md:mt-4 text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] text-primary/60 uppercase">
                  The Precision Manufacturing Group
                </div>
              </div>
              {/* Minimalist Logo Bottom Right */}
              <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex items-end">
                <span className="text-xl md:text-2xl font-display font-bold text-white/30 tracking-tighter">
                  V1
                </span>
              </div>
              {/* Read Button Overlay Bottom */}
              <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2">
                <button className="px-4 md:px-6 py-2 border border-white/10 hover:border-primary/40 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40 hover:text-primary transition-all duration-500">
                  View Project Case
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Contact Section */}
        <section className="max-w-2xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-display mb-4">
              Connect with Fraga Ventures
            </h3>
            <div className="h-px w-24 bg-primary mx-auto opacity-50" />
          </div>
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <input
                  className="peer w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 focus:ring-0 focus:border-primary py-4 px-0 text-slate-900 dark:text-slate-100 placeholder-transparent transition-all"
                  id="name"
                  placeholder="Name"
                  type="text"
                />
                <label
                  className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                  htmlFor="name"
                >
                  Full Name
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 focus:ring-0 focus:border-primary py-4 px-0 text-slate-900 dark:text-slate-100 placeholder-transparent transition-all"
                  id="email"
                  placeholder="Email"
                  type="email"
                />
                <label
                  className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                  htmlFor="email"
                >
                  Email Address
                </label>
              </div>
            </div>
            <div className="relative">
              <textarea
                className="peer w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-700 focus:ring-0 focus:border-primary py-4 px-0 text-slate-900 dark:text-slate-100 placeholder-transparent transition-all"
                id="message"
                placeholder="Message"
                rows={3}
                defaultValue={""}
              />
              <label
                className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                htmlFor="message"
              >
                Your Message
              </label>
            </div>
            <div className="flex justify-center pt-4">
              <button className="cursor-pointer px-12 py-4 bg-primary text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary/20 hover:scale-115 hover:duration-150 ">
                Send Inquiry
              </button>
            </div>
          </form>
        </section>
      </main>
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-slate-500">
          © 2024 Fraga Ventures 3D
        </p>
      </footer>
    </>
  );
}
