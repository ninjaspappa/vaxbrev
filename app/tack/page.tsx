import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tack för din beställning – Vaxbrev.se',
  description: 'Din beställning är mottagen. Vi återkommer med bekräftelse via e-post.',
}

export default function TackPage() {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Top bar */}
      <div className="bg-forest-green py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <Link href="/" className="font-serif text-xl text-cream tracking-wide hover:text-gold transition-colors">
            Vaxbrev.se
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          {/* Icon */}
          <div className="w-20 h-20 bg-forest-green rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-10 h-10 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Heading */}
          <p className="section-label">Beställning mottagen</p>
          <h1 className="font-serif text-4xl md:text-5xl text-forest-green mb-6 leading-tight">
            Tack för din beställning!
          </h1>

          {/* Body */}
          <p className="text-gray-600 text-lg leading-relaxed mb-4">
            Vi har tagit emot din beställning och skickar en bekräftelse till din e-postadress inom kort.
          </p>
          <p className="text-gray-600 leading-relaxed mb-10">
            Din påse är på väg och anländer till brevlådan inom <strong className="text-forest-green">2–3 arbetsdagar</strong>.
            I påsen hittar du instruktioner och en färdig returetikett – lägg i jackan, klistra på etiketten och lämna in på närmaste PostNord-box.
          </p>

          {/* Steps summary */}
          <div className="bg-white border border-cream-dark p-6 mb-10 text-left">
            <h2 className="font-serif text-lg text-forest-green mb-4">Nästa steg</h2>
            <ol className="space-y-3">
              {[
                'Håll utkik – påsen anländer om 2–3 dagar',
                'Lägg i jackan och klistra på returetiketten',
                'Lämna in på närmaste PostNord-box',
                'Vi meddelar dig när jackan är klar',
                'Jackan levereras direkt hem till dörren',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="flex-shrink-0 w-6 h-6 bg-forest-green text-cream text-xs font-semibold rounded-full flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Questions */}
          <p className="text-sm text-gray-500 mb-8">
            Frågor? Kontakta oss på{' '}
            <a
              href="mailto:hej@vaxbrev.se"
              className="text-forest-green underline underline-offset-2 hover:text-gold transition-colors"
            >
              hej@vaxbrev.se
            </a>
          </p>

          <Link href="/" className="btn-gold">
            Tillbaka till startsidan
          </Link>
        </div>
      </div>

      {/* Footer strip */}
      <div className="bg-forest-green py-4 px-6 text-center">
        <p className="text-cream/50 text-xs font-sans">
          &copy; 2025 Vaxbrev.se
        </p>
      </div>
    </div>
  )
}
