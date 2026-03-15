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
    <footer className="border-t border-border py-16 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo + description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md border border-primary/40 flex items-center justify-center bg-primary/5">
                <span className="font-bold text-primary text-xs tracking-tighter">L&L</span>
              </div>
              <span className="font-bold tracking-tight">Layer & Logic</span>
            </div>
            <p className="text-sm text-muted-foreground/60 max-w-sm leading-relaxed mb-6">
              Precision 3D printed artifacts designed with algorithmic creativity and 
              manufactured layer by layer in our personal fabrication studio.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-xs">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="flex-1 bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs text-foreground 
                           placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/40 transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs hover:bg-primary/20 transition-colors"
              >
                {subscribed ? "Subscribed ✓" : "Subscribe"}
              </button>
            </form>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {["Home", "Products", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : link === "Products" ? "/products" : `/#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h4 className="font-mono-data text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40 mb-4">
              Connect
            </h4>
            <ul className="space-y-2">
              {["Twitter / X", "Instagram", "Discord", "GitHub"].map((social) => (
                <li key={social}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground/60 hover:text-primary transition-colors"
                  >
                    {social}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] font-mono-data text-muted-foreground/30">
            © {new Date().getFullYear()} Layer & Logic. All rights reserved.
          </p>
          <p className="text-[10px] font-mono-data text-muted-foreground/30">
            Precision in every layer.
          </p>
        </div>
      </div>
    </footer>
  );
}
