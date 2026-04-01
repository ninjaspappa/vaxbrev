const steps = [
  {
    number: '01',
    title: 'Beställ online',
    description: 'Fyll i formuläret nedan och välj ditt paket. Betalning sker enkelt och säkert.',
  },
  {
    number: '02',
    title: 'Påsen anländer',
    description: 'En skyddspåse med returetikett och instruktioner landar i din brevlåda inom 2–3 dagar.',
  },
  {
    number: '03',
    title: 'Skicka jackan',
    description: 'Lägg jackan i påsen, klistra på den medföljande returetiketten och lämna in på närmaste PostNord-box.',
  },
  {
    number: '04',
    title: 'Jackan vaxas',
    description: 'Jackan behandlas omsorgsfullt av ett auktoriserat vaxningscenter med rätt produkter för ditt plagg.',
  },
  {
    number: '05',
    title: 'Tillbaka som ny',
    description: 'Den nyrenoverade jackan levereras direkt hem till din dörr, packad och klar att bäras.',
  },
]

export default function HowItWorks() {
  return (
    <section id="hur-det-fungerar" className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-xl mb-14 md:mb-20">
          <p className="section-label">Processen</p>
          <h2 className="section-title mb-4">
            Fem enkla steg – vi sköter resten
          </h2>
          <p className="font-sans text-gray-500 leading-relaxed">
            Ingen post office, inga krångliga paket. Du beställer online och vi fixar allt därifrån.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative flex flex-col items-start lg:items-center lg:text-center group"
              >
                {/* Number badge */}
                <div className="w-16 h-16 bg-forest-green text-gold font-serif text-xl flex items-center justify-center flex-shrink-0 mb-5 group-hover:bg-forest-light transition-colors duration-200">
                  {step.number}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-serif text-lg text-forest-green mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow between steps — mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block lg:hidden absolute -right-4 top-7 text-gold/40" aria-hidden="true">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
