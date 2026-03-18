import { POSTS } from "./data";

export function LatestPosts() {
  return (
    <section id="posts" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">
              From the Blog
            </p>
            <h2 className="text-3xl md:text-5xl font-serif">Latest Updates</h2>
          </div>
          <a href="/blog" className="mt-4 md:mt-0 text-sm text-primary hover:underline underline-offset-4">
            View all posts →
          </a>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post) => (
            <a
              key={post.title}
              href={post.href}
              className="group block p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-primary tracking-wide uppercase">{post.category}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <h3 className="text-xl font-serif mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-1 text-sm text-primary">
                Read more
                <svg
                  className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M7 7h10v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
