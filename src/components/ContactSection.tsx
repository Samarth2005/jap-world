import { motion } from "framer-motion";
import { Send, Mail, MapPin } from "lucide-react";
import { useState, useRef } from "react";
import { quint } from "@/lib/motion";

/** Sanitize user input — strip HTML tags and trim */
function sanitize(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

/** Basic email validation */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const SUBMIT_COOLDOWN_MS = 5000;

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const lastSubmit = useRef(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Rate limit
    const now = Date.now();
    if (now - lastSubmit.current < SUBMIT_COOLDOWN_MS) {
      setError("Please wait a few seconds before sending again.");
      return;
    }

    const form = e.currentTarget;
    const name = sanitize((form.elements.namedItem("name") as HTMLInputElement).value);
    const email = sanitize((form.elements.namedItem("email") as HTMLInputElement).value);
    const message = sanitize((form.elements.namedItem("message") as HTMLTextAreaElement).value);

    if (!name || name.length < 2 || name.length > 100) {
      setError("Please enter a valid name (2–100 characters).");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!message || message.length < 10 || message.length > 2000) {
      setError("Message must be between 10 and 2000 characters.");
      return;
    }

    lastSubmit.current = now;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="py-32 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={quint}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Get In Touch</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-4">Workshop</h3>
              <p className="text-muted-foreground leading-relaxed">
                We'd love to hear about your project ideas or answer any questions about our process.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <Mail className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data mb-0.5">Email</p>
                  <p className="text-foreground text-sm">hello@layerandlogic.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <svg className="w-4 h-4 text-foreground" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data mb-0.5">Instagram</p>
                  <p className="text-foreground text-sm">@layerandlogic</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data mb-0.5">Location</p>
                  <p className="text-foreground text-sm">Brooklyn, NY</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ ...quint, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data block mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  maxLength={254}
                  className="w-full bg-transparent border-b border-border px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wider font-mono-data block mb-2">Message</label>
              <textarea
                name="message"
                required
                rows={4}
                maxLength={2000}
                className="w-full bg-transparent border-b border-border px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors duration-300 resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <button
              type="submit"
              disabled={sent}
              className="px-8 py-3.5 bg-foreground text-background text-sm font-medium rounded-full hover:opacity-90 transition-opacity duration-300 flex items-center gap-2 disabled:opacity-50"
            >
              {sent ? "Message Sent ✓" : <><Send className="w-4 h-4" /> Send Message</>}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
