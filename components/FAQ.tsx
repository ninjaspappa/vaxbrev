'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'Hur länge tar det?',
    answer:
      'Med standardpaketet är din jacka tillbaka inom 2–3 veckor från det att vi mottagit den. Väljer du expresstillägget hanteras jackan med prioritet och levereras inom 1 vecka. Leveranstiderna gäller från det att jackan ankommit till vårt vaxningscenter.',
  },
  {
    question: 'Vilka jackor tar ni emot?',
    answer:
      'Vi tar emot de flesta vaxade jackor – primärt Barbour Beaufort, Bedale, Beadnell och liknande modeller. Även andra märken med vaxad bomullsyta fungerar utmärkt. Är du osäker på om din jacka passar? Skriv modellen i noteringsrutan vid beställning, så bekräftar vi.',
  },
  {
    question: 'Vad händer om jackan skadas under frakt?',
    answer:
      'Samtliga jackor är fullt försäkrade under hela transporten – både till och från vaxningscentret. Uppstår en skada ersätts du för jackans fulla värde. Vi dokumenterar jackans skick vid mottagning och kan bifoga foton om du önskar.',
  },
  {
    question: 'Kan jag skicka in flera jackor?',
    answer:
      'Absolut! Välj 2-jackors-paketet i formuläret och lägg båda jackorna i den medföljande påsen. Behöver du skicka fler än två jackor? Kontakta oss på hej@vaxbrev.se för ett skräddarsytt erbjudande.',
  },
  {
    question: 'Hur vet jag att jackan behöver vaxas?',
    answer:
      'Gör ett enkelt vattentest: stänk lite vatten på jackan. Pärlar sig vattnet och rullar av tyget sitter vaxet fortfarande bra. Sjunker vattnet in och mörknar tyget är det dags att vaxa om. Vi rekommenderar omvaxning vartannat år eller efter en tung säsong.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="bg-cream py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          {/* Left — header */}
          <div className="lg:col-span-1">
            <p className="section-label">Frågor & svar</p>
            <h2 className="section-title mb-5">
              Vanliga frågor
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed mb-6">
              Hittar du inte svaret du letar efter? Hör av dig direkt.
            </p>
            <a
              href="mailto:hej@vaxbrev.se"
              className="font-sans text-sm font-medium text-forest-green border-b border-forest-green/30 pb-0.5 hover:border-forest-green hover:text-gold transition-colors duration-150"
            >
              hej@vaxbrev.se
            </a>
          </div>

          {/* Right — accordion */}
          <div className="lg:col-span-2">
            <dl className="space-y-1">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <dt>
                      <button
                        type="button"
                        onClick={() => toggle(index)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-forest-green focus-visible:ring-offset-2 group"
                      >
                        <span className={`font-serif text-base leading-snug transition-colors duration-150 ${
                          isOpen ? 'text-gold' : 'text-forest-green group-hover:text-forest-light'
                        }`}>
                          {faq.question}
                        </span>
                        <span
                          className={`flex-shrink-0 w-6 h-6 flex items-center justify-center border transition-all duration-200 ${
                            isOpen
                              ? 'border-gold bg-gold text-forest-green'
                              : 'border-gray-300 text-gray-400 group-hover:border-forest-green group-hover:text-forest-green'
                          }`}
                          aria-hidden="true"
                        >
                          <svg
                            className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                          </svg>
                        </span>
                      </button>
                    </dt>
                    <dd
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="font-sans text-sm text-gray-500 leading-relaxed pb-5 pr-10">
                        {faq.answer}
                      </p>
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
