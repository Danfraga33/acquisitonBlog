import { Link } from "react-router"

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 md:py-32 px-6 bg-secondary/30">
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              About This Journey
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-foreground leading-tight mb-6 text-balance">
              Building wealth through
              <br />
              <span className="text-primary">acquisition</span>
            </h2>
          </div>
          
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-lg">
              After years in corporate, I made the decision to pursue a different path — 
              acquiring and operating a small business. This blog documents that journey 
              in real-time, sharing the wins, the setbacks, and everything in between.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From learning to evaluate deals and understanding SBA financing to building 
              relationships with brokers and navigating due diligence, I&apos;m sharing it all. 
              My hope is that this resource helps others considering a similar path.
            </p>
            
            <div className="pt-4">
              <Link to="#posts"
                className="hover:transition-all inline-flex items-center gap-2 text-primary hover:underline underline-offset-4 hover:duration-300"
              >
                Read the latest updates
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
