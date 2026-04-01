export default function Footer() {
  return (
    <footer className="bg-forest-green">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-serif text-2xl text-cream mb-3 tracking-wide">
              Vaxbrev.se
            </p>
            <p className="font-sans text-sm text-cream/50 leading-relaxed max-w-xs">
              Sveriges bekvämlaste omvaxningstjänst för Barbour och vaxjackor – från dörr till dörr.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Snabblänkar
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Hur det fungerar', href: '#hur-det-fungerar' },
                { label: 'Priser', href: '#priser' },
                { label: 'Beställ', href: '#bestall' },
                { label: 'Vanliga frågor', href: '#faq' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-widest uppercase text-gold mb-4">
              Kontakt
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hej@vaxbrev.se"
                  className="flex items-center gap-2.5 font-sans text-sm text-cream/60 hover:text-gold transition-colors duration-150 group"
                >
                  <svg
                    className="w-4 h-4 text-cream/30 group-hover:text-gold transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  hej@vaxbrev.se
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-cream/30 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-sans text-sm text-cream/50 leading-relaxed">
                  Sverige
                </span>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 flex gap-4">
              {['PostNord', 'Försäkrat'].map((badge) => (
                <span
                  key={badge}
                  className="font-sans text-xs text-cream/30 border border-cream/10 px-2.5 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-xs text-cream/30">
            &copy; 2025 Vaxbrev.se. Alla rättigheter förbehållna.
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: 'Köpvillkor', href: '#' },
              { label: 'Integritetspolicy', href: '#' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => e.preventDefault()}
                className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
