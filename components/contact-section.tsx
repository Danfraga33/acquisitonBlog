export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 border-t border-border">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-4">Get in Touch</p>
          <h3 className="text-3xl md:text-4xl font-serif mb-4">Connect with Fraga Ventures</h3>
          <div className="h-px w-24 bg-primary mx-auto opacity-50" />
        </div>
        <form className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <input
                className="peer w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 px-0 placeholder-transparent transition-all"
                id="name"
                placeholder="Name"
                type="text"
              />
              <label
                className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                htmlFor="name"
              >
                Full Name
              </label>
            </div>
            <div className="relative">
              <input
                className="peer w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 px-0 placeholder-transparent transition-all"
                id="email"
                placeholder="Email"
                type="email"
              />
              <label
                className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
                htmlFor="email"
              >
                Email Address
              </label>
            </div>
          </div>
          <div className="relative">
            <textarea
              className="peer w-full bg-transparent border-0 border-b border-border focus:ring-0 focus:border-primary py-4 px-0 placeholder-transparent transition-all"
              id="message"
              placeholder="Message"
              rows={3}
              defaultValue={""}
            />
            <label
              className="absolute left-0 -top-3 text-xs uppercase tracking-widest text-muted-foreground transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-primary"
              htmlFor="message"
            >
              Your Message
            </label>
          </div>
          <div className="flex justify-center pt-4">
            <button className="cursor-pointer px-12 py-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              Send Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
