import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer id="contacto" className="bg-charcoal-900 text-ivory-100/80">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-2xl text-ivory-50">
              Martha&apos;s <span className="italic text-gold-400">Healing Touch</span>
            </p>
            <p className="mt-4 font-sans text-sm leading-relaxed">
              Medical spa de lujo en Pembroke Pines. Heal. Sculpt. Glow.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] text-gold-200 uppercase">
              Contacto
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <a href={siteConfig.phoneHref} className="transition hover:text-gold-200">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="transition hover:text-gold-200">
                  {siteConfig.email}
                </a>
              </li>
              <li>{siteConfig.address.full}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] text-gold-200 uppercase">
              Horarios
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              {siteConfig.hours.map((row) => (
                <li key={row.day}>
                  <span className="text-ivory-50">{row.day}:</span> {row.hours}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs tracking-[0.25em] text-gold-200 uppercase">
              Redes
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm">
              <li>
                <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-200">
                  Instagram @martha.healingtouch
                </a>
              </li>
              <li>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-200">
                  Facebook
                </a>
              </li>
              <li>
                <a href={siteConfig.social.tiktok} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-200">
                  TikTok
                </a>
              </li>
              <li>
                <a href={siteConfig.social.whatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-gold-200">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl">
          <iframe
            title="Ubicación de Martha's Healing Touch en Google Maps"
            src={siteConfig.mapsEmbed}
            className="h-64 w-full border-0 grayscale-[30%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ivory-50/10 pt-8 md:flex-row">
          <p className="font-sans text-xs text-ivory-100/50">
            © {new Date().getFullYear()} Martha&apos;s Healing Touch. Todos los derechos reservados.
          </p>
          <Link href={siteConfig.booksy} className="font-sans text-xs text-gold-200 transition hover:text-gold-400">
            Reservar en Booksy →
          </Link>
        </div>
      </div>
    </footer>
  );
}
