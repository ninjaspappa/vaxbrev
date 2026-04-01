'use client'

import { useLocale, formatPrice } from '../context/LocaleContext'

// Base prices in SEK
const BASE_PRICES = {
  single: 1195,
  double: 2190,
  express: 295,
} as const

export default function Pricing() {
  const { locale } = useLocale()

  const handleScroll = () => {
    document.getElementById('bestall')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Apply international surcharge to package prices (not to express)
  const singleSEK = BASE_PRICES.single + locale.surcharge
  const doubleSEK = BASE_PRICES.double + locale.surcharge
  const expressSEK = BASE_PRICES.express

  const plans = [
    {
      id: 'single',
      name: '1 jacka',
      priceFormatted: formatPrice(singleSEK, locale),
      popular: false,
      features: [
        'Fri frakt tur & retur',
        'Skyddspåse med returetikett',
        'Professionell vaxning',
        'Leverans hem till dörren',
      ],
      cta: 'Välj detta paket',
    },
    {
      id: 'double',
      name: '2 jackor',
      priceFormatted: formatPrice(doubleSEK, locale),
      popular: true,
      badge: 'Mest populärt',
      savings: locale.country === 'SE' ? 'Spara 200 kr' : null,
      features: [
        'Fri frakt tur & retur',
        'Skyddspåse med returetikett',
        'Professionell vaxning – 2 jackor',
        'Leverans hem till dörren',
      ],
      cta: 'Välj detta paket',
    },
    {
      id: 'express',
      name: 'Expresstillägg',
      priceFormatted: `+${formatPrice(expressSEK, locale)}`,
      popular: false,
      addOn: true,
      features: [
        'Prioriterad hantering',
        'Leverans inom 1 vecka',
        'Läggs till på valfritt paket',
        'Statusuppdatering via e-post',
      ],
      cta: 'Lägg till express',
    },
  ]

  const surchargeNote =
    locale.surcharge > 0
      ? `inkl. +${formatPrice(locale.surcharge, locale)} internationell frakt`
      : null

  return (
    <section id="priser" className="bg-forest-green py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-14 md:mb-16">
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-gold mb-3">
            Priser
          </p>
          <h2 className="font-serif text-3xl md:text-4xl text-cream leading-tight mb-4">
            Enkla, transparenta priser
          </h2>
          <p className="font-sans text-cream/60 leading-relaxed">
            Inga dolda avgifter. Allt ingår – frakt, påse, vaxning och retur.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col transition-transform duration-200 hover:-translate-y-1 ${
                plan.popular
                  ? 'bg-cream shadow-card-hover'
                  : plan.addOn
                  ? 'bg-forest-light/60 border border-gold/20'
                  : 'bg-forest-light/40 border border-cream/10'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-forest-green text-xs font-sans font-semibold px-4 py-1 tracking-wide uppercase">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                {/* Plan name */}
                <p
                  className={`font-sans text-xs font-semibold tracking-widest uppercase mb-4 ${
                    plan.popular
                      ? 'text-gold'
                      : plan.addOn
                      ? 'text-gold/70'
                      : 'text-cream/50'
                  }`}
                >
                  {plan.name}
                </p>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  <span
                    className={`font-serif text-4xl font-normal leading-none ${
                      plan.popular ? 'text-forest-green' : 'text-cream'
                    }`}
                  >
                    {plan.priceFormatted}
                  </span>
                </div>

                {/* Surcharge note */}
                {surchargeNote && !plan.addOn && (
                  <p
                    className={`font-sans text-xs mt-1 mb-1 ${
                      plan.popular ? 'text-gray-400' : 'text-cream/40'
                    }`}
                  >
                    {surchargeNote}
                  </p>
                )}

                {/* Savings tag */}
                {plan.savings && (
                  <span className="inline-block bg-gold/20 text-gold text-xs font-sans font-medium px-2.5 py-1 mb-5 w-fit mt-2">
                    {plan.savings}
                  </span>
                )}

                {/* Add-on tag */}
                {plan.addOn && (
                  <p className="font-sans text-xs text-cream/50 mb-5 mt-2">
                    Läggs till på valbart paket
                  </p>
                )}

                {!plan.savings && !plan.addOn && !surchargeNote && (
                  <div className="mb-5" />
                )}
                {!plan.savings && !plan.addOn && surchargeNote && (
                  <div className="mb-3" />
                )}

                {/* Divider */}
                <div
                  className={`h-px mb-6 ${
                    plan.popular ? 'bg-gray-200' : 'bg-cream/10'
                  }`}
                />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 font-sans text-sm"
                    >
                      <svg
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-forest-green' : 'text-gold'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span
                        className={
                          plan.popular ? 'text-gray-600' : 'text-cream/70'
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={handleScroll}
                  className={`w-full py-3.5 font-sans text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.popular
                      ? 'bg-forest-green text-cream hover:bg-forest-light focus:ring-forest-green focus:ring-offset-cream'
                      : 'bg-gold/20 text-gold border border-gold/40 hover:bg-gold hover:text-forest-green focus:ring-gold focus:ring-offset-forest-green'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Fine print */}
        <p className="font-sans text-xs text-cream/30 mt-8 text-center">
          Priser inkl. moms. Betalning sker vid beställning.
          {locale.country !== 'SE' && (
            <span className="block mt-1 text-cream/20">
              Priser visas i {locale.currency}. Betalning sker i SEK vid kassa. Kurs: 1 SEK ≈ {locale.rate.toFixed(locale.currency === 'EUR' ? 3 : 2)} {locale.currency}.
            </span>
          )}
        </p>
      </div>
    </section>
  )
}
