
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Header } from "./header"
import { Footer } from "./footer"
import { Link } from "react-router"


interface PostLayoutProps {
  title: string
  category: string
  date: string
  readTime: string
  prevPost?: { title: string; href: string }
  nextPost?: { title: string; href: string }
  children: React.ReactNode
}

export function PostLayout({
  title,
  category,
  date,
  readTime,
  prevPost,
  nextPost,
  children,
}: PostLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <article className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          {/* Post Header */}
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs text-primary tracking-[0.2em] uppercase">
                {category}
              </span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{date}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-xs text-muted-foreground">{readTime}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.1] text-balance">
              {title}
            </h1>
          </header>
          
          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            {children}
          </div>
          
          {/* Post Navigation */}
          <nav className="mt-20 pt-10 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between gap-6">
              {prevPost ? (
                <Link
                  to={prevPost.href}
                  className="group flex items-start gap-3 flex-1"
                >
                  <ArrowLeft className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      Previous
                    </span>
                    <p className="text-foreground group-hover:text-primary transition-colors font-serif">
                      {prevPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              
              {nextPost ? (
                <Link
                  to={nextPost.href}
                  className="group flex items-start gap-3 flex-1 sm:text-right sm:flex-row-reverse"
                >
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors mt-1 shrink-0" />
                  <div>
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      Next
                    </span>
                    <p className="text-foreground group-hover:text-primary transition-colors font-serif">
                      {nextPost.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </nav>
        </div>
      </article>
      
      <Footer />
    </div>
  )
}