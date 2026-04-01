'use client'

import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'

type FormValues = {
  fornamn: string
  efternamn: string
  epost: string
  telefon: string
  adress: string
  postnummer: string
  ort: string
  paket: '1-jacka' | '2-jackor'
  express: boolean
  notering: string
  villkor: boolean
}

export default function OrderForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      paket: '1-jacka',
      express: false,
      villkor: false,
    },
  })

  const selectedPaket = watch('paket')
  const expressChecked = watch('express')

  const totalPrice = () => {
    const base = selectedPaket === '2-jackor' ? 2190 : 1195
    return expressChecked ? base + 295 : base
  }

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    setErrorMsg(null)

    const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID

    try {
      const response = await fetch(
        `https://formspree.io/f/${formspreeId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            ...data,
            totalPris: `${totalPrice()} kr`,
            _subject: `Ny vaxbeställning – ${data.fornamn} ${data.efternamn}`,
          }),
        }
      )

      if (response.ok) {
        router.push('/tack')
      } else {
        const body = await response.json()
        const msg =
          body?.errors?.map((e: { message: string }) => e.message).join(', ') ||
          'Något gick fel. Försök igen eller kontakta oss via e-post.'
        setErrorMsg(msg)
      }
    } catch {
      setErrorMsg('Nätverksfel – kontrollera din internetanslutning och försök igen.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="bestall" className="bg-cream-dark py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column — info */}
          <div className="lg:sticky lg:top-12">
            <p className="section-label">Beställ</p>
            <h2 className="section-title mb-6">
              Kom igång på tre minuter
            </h2>
            <p className="font-sans text-gray-500 leading-relaxed mb-8">
              Fyll i formuläret så skickar vi påsen till din adress. I påsen finns allt du behöver – inklusive returetikett och instruktioner.
            </p>

            {/* What's included */}
            <div className="bg-white p-6 border border-gray-200 mb-8">
              <h3 className="font-serif text-base text-forest-green mb-4">Ingår i priset</h3>
              <ul className="space-y-2.5">
                {[
                  'Skyddspåse hem till brevlådan',
                  'Professionell vaxning av auktoriserat center',
                  'Fri frakt tur & retur med PostNord',
                  'Återleverans hem till dörren',
                  'Fullt försäkrad under transporten',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600 font-sans">
                    <svg className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price summary */}
            <div className="bg-forest-green p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-sans text-sm text-cream/70">
                  {selectedPaket === '2-jackor' ? '2-jackors paket' : '1-jackors paket'}
                </span>
                <span className="font-serif text-cream text-sm">
                  {selectedPaket === '2-jackor' ? '2 190 kr' : '1 195 kr'}
                </span>
              </div>
              {expressChecked && (
                <div className="flex justify-between items-center mb-2">
                  <span className="font-sans text-sm text-cream/70">Expresstillägg</span>
                  <span className="font-serif text-cream text-sm">+295 kr</span>
                </div>
              )}
              <div className="h-px bg-cream/10 my-3" />
              <div className="flex justify-between items-center">
                <span className="font-sans text-sm font-semibold text-cream">Totalt</span>
                <span className="font-serif text-gold text-xl">{totalPrice().toLocaleString('sv-SE')} kr</span>
              </div>
            </div>
          </div>

          {/* Right column — form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Name row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fornamn" className="form-label">
                    Förnamn <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="fornamn"
                    type="text"
                    autoComplete="given-name"
                    className={`form-input ${errors.fornamn ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''}`}
                    placeholder="Anna"
                    {...register('fornamn', { required: 'Förnamn är obligatoriskt' })}
                  />
                  {errors.fornamn && (
                    <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.fornamn.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="efternamn" className="form-label">
                    Efternamn <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="efternamn"
                    type="text"
                    autoComplete="family-name"
                    className={`form-input ${errors.efternamn ? 'border-red-400' : ''}`}
                    placeholder="Lindqvist"
                    {...register('efternamn', { required: 'Efternamn är obligatoriskt' })}
                  />
                  {errors.efternamn && (
                    <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.efternamn.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="epost" className="form-label">
                  E-post <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="epost"
                  type="email"
                  autoComplete="email"
                  className={`form-input ${errors.epost ? 'border-red-400' : ''}`}
                  placeholder="anna@exempel.se"
                  {...register('epost', {
                    required: 'E-post är obligatorisk',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Ange en giltig e-postadress',
                    },
                  })}
                />
                {errors.epost && (
                  <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.epost.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="telefon" className="form-label">
                  Telefon <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="telefon"
                  type="tel"
                  autoComplete="tel"
                  className={`form-input ${errors.telefon ? 'border-red-400' : ''}`}
                  placeholder="070 123 45 67"
                  {...register('telefon', { required: 'Telefonnummer är obligatoriskt' })}
                />
                {errors.telefon && (
                  <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.telefon.message}</p>
                )}
              </div>

              {/* Address */}
              <div>
                <label htmlFor="adress" className="form-label">
                  Gatuadress <span className="text-red-500" aria-hidden="true">*</span>
                </label>
                <input
                  id="adress"
                  type="text"
                  autoComplete="street-address"
                  className={`form-input ${errors.adress ? 'border-red-400' : ''}`}
                  placeholder="Storgatan 12"
                  {...register('adress', { required: 'Adress är obligatorisk' })}
                />
                {errors.adress && (
                  <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.adress.message}</p>
                )}
              </div>

              {/* Postcode + City */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postnummer" className="form-label">
                    Postnummer <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="postnummer"
                    type="text"
                    autoComplete="postal-code"
                    inputMode="numeric"
                    className={`form-input ${errors.postnummer ? 'border-red-400' : ''}`}
                    placeholder="114 29"
                    {...register('postnummer', {
                      required: 'Postnummer är obligatoriskt',
                      pattern: {
                        value: /^\d{3}\s?\d{2}$/,
                        message: 'Ange ett giltigt postnummer (t.ex. 114 29)',
                      },
                    })}
                  />
                  {errors.postnummer && (
                    <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.postnummer.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="ort" className="form-label">
                    Ort <span className="text-red-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="ort"
                    type="text"
                    autoComplete="address-level2"
                    className={`form-input ${errors.ort ? 'border-red-400' : ''}`}
                    placeholder="Stockholm"
                    {...register('ort', { required: 'Ort är obligatorisk' })}
                  />
                  {errors.ort && (
                    <p className="mt-1.5 text-xs text-red-500 font-sans">{errors.ort.message}</p>
                  )}
                </div>
              </div>

              {/* Package selection */}
              <fieldset>
                <legend className="form-label mb-3">
                  Välj paket <span className="text-red-500" aria-hidden="true">*</span>
                </legend>
                <div className="space-y-3">
                  {[
                    { value: '1-jacka', label: '1 jacka', price: '1 195 kr' },
                    { value: '2-jackor', label: '2 jackor', price: '2 190 kr – spara 200 kr', badge: 'Populärast' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between gap-4 p-4 border cursor-pointer transition-colors duration-150 ${
                        selectedPaket === option.value
                          ? 'border-forest-green bg-white'
                          : 'border-gray-200 bg-white/60 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          value={option.value}
                          className="w-4 h-4 text-forest-green border-gray-300 focus:ring-forest-green accent-forest-green"
                          {...register('paket', { required: true })}
                        />
                        <span className="font-sans text-sm text-ink">{option.label}</span>
                        {option.badge && (
                          <span className="hidden sm:inline bg-gold/15 text-gold text-xs px-2 py-0.5 font-sans font-medium">
                            {option.badge}
                          </span>
                        )}
                      </div>
                      <span className="font-serif text-sm text-forest-green whitespace-nowrap">{option.price}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Express add-on */}
              <div>
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors duration-150 ${
                  expressChecked ? 'border-gold bg-gold/5' : 'border-gray-200 bg-white/60 hover:border-gray-300'
                }`}>
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 text-gold border-gray-300 focus:ring-gold accent-gold flex-shrink-0"
                    {...register('express')}
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-sm font-medium text-ink">Expresstillägg</span>
                      <span className="font-serif text-sm text-gold">+295 kr</span>
                    </div>
                    <p className="font-sans text-xs text-gray-400 mt-0.5">
                      Klar inom 1 vecka istället för 2–3 veckor
                    </p>
                  </div>
                </label>
              </div>

              {/* Notes */}
              <div>
                <label htmlFor="notering" className="form-label">
                  Jackmodell / notering{' '}
                  <span className="text-gray-400 font-normal">(valfritt)</span>
                </label>
                <textarea
                  id="notering"
                  rows={3}
                  className="form-input resize-none"
                  placeholder="T.ex. Barbour Beaufort, marinblå, stl L – eller andra önskemål"
                  {...register('notering')}
                />
              </div>

              {/* Terms */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 text-forest-green border-gray-300 focus:ring-forest-green accent-forest-green flex-shrink-0"
                    {...register('villkor', {
                      required: 'Du måste godkänna villkoren för att fortsätta',
                    })}
                  />
                  <span className="font-sans text-sm text-gray-600 leading-relaxed">
                    Jag godkänner{' '}
                    <a
                      href="#"
                      className="text-forest-green underline underline-offset-2 hover:text-gold transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      köpvillkoren
                    </a>{' '}
                    och{' '}
                    <a
                      href="#"
                      className="text-forest-green underline underline-offset-2 hover:text-gold transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      integritetspolicyn
                    </a>
                    . <span className="text-red-500" aria-hidden="true">*</span>
                  </span>
                </label>
                {errors.villkor && (
                  <p className="mt-1.5 text-xs text-red-500 font-sans ml-7">{errors.villkor.message}</p>
                )}
              </div>

              {/* Error message */}
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 p-4" role="alert">
                  <p className="font-sans text-sm text-red-600">{errorMsg}</p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-forest-green text-cream font-sans font-semibold text-sm tracking-wide uppercase py-4 hover:bg-forest-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-forest-green focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Skickar...
                  </span>
                ) : (
                  `Beställ nu – ${totalPrice().toLocaleString('sv-SE')} kr`
                )}
              </button>

              <p className="text-xs text-gray-400 text-center font-sans">
                Betalning sker säkert via Stripe efter beställning bekräftats.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
