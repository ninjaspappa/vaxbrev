'use client'

export default function Hero() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = document.getElementById('bestall')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative bg-forest-green overflow-hidden">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C8A96E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 lg:py-44">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="font-sans text-xs font-semibold tracking-widest uppercase text-gold mb-6">
            Omvaxningstjänst
          </p>

          {/* Headline */}
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream leading-tight mb-6">
            Skicka påsen.{' '}
            <br className="hidden sm:block" />
            Skicka jackan.{' '}
            <br className="hidden sm:block" />
            <span className="text-gold">Få den tillbaka perfekt vaxad.</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-cream/75 leading-relaxed mb-10 max-w-xl">
            Sveriges bekvämlaste omvaxningstjänst för Barbour&nbsp;&amp;&nbsp;vaxjackor.
            Från dörr till dörr – utan krångel.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#bestall" onClick={handleScroll} className="btn-gold text-center">
              Beställ din påse
            </a>
            <a href="#hur-det-fungerar" className="btn-outline text-center" onClick={(e) => {
              e.preventDefault()
              document.getElementById('hur-det-fungerar')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              Hur det fungerar
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-cream/10 flex flex-wrap gap-6 md:gap-10">
            {[
              { label: 'Fri frakt', detail: 'Tur & retur ingår' },
              { label: 'Auktoriserat center', detail: 'Godkänd vaxning' },
              { label: 'Fullt försäkrat', detail: 'Under hela transporten' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <span className="font-serif text-cream text-sm font-medium">{item.label}</span>
                <span className="font-sans text-cream/50 text-xs mt-0.5">{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-cream/5" aria-hidden="true" />
    </section>
  )
}
