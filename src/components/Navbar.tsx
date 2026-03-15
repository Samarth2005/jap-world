import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/hooks/useCart";

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] };

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => setMobileOpen(false), [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.slice(2);
      if (location.pathname === "/") {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={transition}
      className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-500 ${
        scrolled ? "glass-strong glow-cyan" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md border border-primary/40 flex items-center justify-center bg-primary/5">
            <span className="font-bold text-primary text-sm tracking-tighter">L&L</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-foreground hidden sm:inline">
            Layer & Logic
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.href.startsWith("/#") ? "/" : link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Cart + mobile toggle */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <ShoppingCart className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-accent text-accent-foreground text-[10px] flex items-center justify-center font-mono-data">
                {items.length}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-muted-foreground hover:text-primary transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={transition}
            className="absolute top-16 inset-x-0 glass-strong p-6 md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href.startsWith("/#") ? "/" : link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
