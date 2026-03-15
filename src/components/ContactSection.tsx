import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

export default function ContactSection() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="container mx-auto max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={transition}
          className="text-center mb-12"
        >
          <p className="font-mono-data text-xs uppercase tracking-[0.3em] text-primary/60 mb-3">
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold">
            Get in <span className="text-gradient-cyan">Touch</span>
          </h2>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-muted-foreground/60 uppercase tracking-wider font-mono-data block mb-2">
                Name
              </label>
              <input
                type="text"
                required
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground 
                           placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground/60 uppercase tracking-wider font-mono-data block mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground 
                           placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors"
                placeholder="your@email.com"
              />
            </div>
          </div>
          <div>
            <label className="text-xs text-muted-foreground/60 uppercase tracking-wider font-mono-data block mb-2">
              Message
            </label>
            <textarea
              required
              rows={4}
              className="w-full bg-muted/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground 
                         placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/40 transition-colors resize-none"
              placeholder="Tell us about your interest..."
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm 
                       hover:scale-[0.98] active:scale-[0.96] transition-transform duration-200 glow-cyan
                       flex items-center justify-center gap-2"
          >
            {sent ? (
              "Message Sent ✓"
            ) : (
              <>
                <Send className="w-4 h-4" /> Send Message
              </>
            )}
          </button>
        </motion.form>

        {/* Social links */}
        <div className="flex justify-center gap-6 mt-8">
          {[
            { icon: Mail, label: "Email", href: "mailto:hello@layerandlogic.com" },
            { icon: MessageSquare, label: "Discord", href: "#" },
          ].map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                className="text-muted-foreground/40 hover:text-primary transition-colors duration-300"
                aria-label={social.label}
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
