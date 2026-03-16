import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="border-t border-border py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Brand */}
          <div>
            <h4 className="text-lg font-bold mb-4">Layer & Logic</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-xs">
              Precision 3D printed artifacts designed with algorithmic creativity and manufactured layer by layer.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 bg-transparent border-b border-border px-0 py-2 text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground transition-colors"
              />
              <button
                type="submit"
                className="text-xs text-foreground font-medium hover:opacity-70 transition-opacity"
              >
                {subscribed ? "Done ✓" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-mono-data uppercase tracking-[0.2em] text-muted-foreground mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About", to: "/#about" },
                { label: "Contact", to: "/#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs font-mono-data uppercase tracking-[0.2em] text-muted-foreground mb-6">Social</h4>
            <ul className="space-y-3">
              {["Instagram", "Twitter", "GitHub"].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Layer & Logic. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Precision in every layer.
          </p>
        </div>
      </div>
    </footer>
  );
}
