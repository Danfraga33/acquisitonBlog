import { SEARCH_START_DATE, STATS } from "./data";

function getMonthsSearching() {
  const now = new Date();
  const years = now.getFullYear() - SEARCH_START_DATE.getFullYear();
  const months = now.getMonth() - SEARCH_START_DATE.getMonth();
  return Math.max(0, years * 12 + months);
}

export function StatsSection() {
  const allStats = [
    { value: String(getMonthsSearching()), label: "Months Searching" },
    ...STATS,
  ];

  return (
    <section className="border-y border-border px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-12">
          {allStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-primary mb-2 font-serif text-5xl md:text-6xl">
                {stat.value}
              </p>
              <p className="text-muted-foreground text-sm tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
