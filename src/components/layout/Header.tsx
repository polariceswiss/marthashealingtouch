"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { navLinks, siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-sage-100/20 bg-ivory-50/95 shadow-soft backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10 lg:px-16">
        <Link
          href="#inicio"
          className={cn(
            "font-serif text-xl tracking-wide transition-colors md:text-2xl",
            scrolled ? "text-charcoal-900" : "text-ivory-50",
          )}
        >
          Martha&apos;s{" "}
          <span className="font-light italic text-gold-600">Healing Touch</span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-sans text-sm tracking-wide transition-colors hover:text-gold-600",
                scrolled ? "text-charcoal-800" : "text-ivory-100",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button
            href={siteConfig.booksy}
            external
            size="sm"
            className={scrolled ? "" : "border-ivory-50/40 bg-ivory-50/10 text-ivory-50 hover:bg-ivory-50/20"}
          >
            Reservar
          </Button>
        </nav>

        <button
          type="button"
          className={cn(
            "flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden",
            scrolled ? "text-charcoal-900" : "text-ivory-50",
          )}
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className={cn("h-0.5 w-6 bg-current transition", menuOpen && "translate-y-2 rotate-45")} />
          <span className={cn("h-0.5 w-6 bg-current transition", menuOpen && "opacity-0")} />
          <span className={cn("h-0.5 w-6 bg-current transition", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-sage-100/30 bg-ivory-50/98 px-6 py-8 backdrop-blur-lg lg:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-serif text-2xl text-charcoal-900"
                >
                  {link.label}
                </Link>
              ))}
              <Button href={siteConfig.booksy} external size="lg" className="mt-2 w-full">
                Reservar ahora
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
