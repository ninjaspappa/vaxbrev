'use client'

import { useState } from 'react'
import { useLocale, type CountryCode } from '../context/LocaleContext'

/* -------------------------------------------------------------------------- */
/* Flag SVGs — Nordic cross, viewBox="0 0 22 16"                              */
/* The vertical bar is offset left of centre (classic Nordic cross position)  */
/* -------------------------------------------------------------------------- */

function FlagSE() {
  return (
    <svg viewBox="0 0 22 16" width={28} height={20} aria-label="Sverige" role="img">
      {/* Blue background */}
      <rect width={22} height={16} fill="#006AA7" />
      {/* Yellow horizontal bar */}
      <rect x={0} y={6} width={22} height={4} fill="#FECC02" />
      {/* Yellow vertical bar — offset left of centre at x=5 */}
      <rect x={5} y={0} width={4} height={16} fill="#FECC02" />
    </svg>
  )
}

function FlagDK() {
  return (
    <svg viewBox="0 0 22 16" width={28} height={20} aria-label="Danmark" role="img">
      {/* Red background */}
      <rect width={22} height={16} fill="#C60C30" />
      {/* White horizontal bar */}
      <rect x={0} y={6} width={22} height={4} fill="#FFFFFF" />
      {/* White vertical bar */}
      <rect x={5} y={0} width={4} height={16} fill="#FFFFFF" />
    </svg>
  )
}

function FlagFI() {
  return (
    <svg viewBox="0 0 22 16" width={28} height={20} aria-label="Suomi" role="img">
      {/* White background */}
      <rect width={22} height={16} fill="#FFFFFF" />
      {/* Blue horizontal bar */}
      <rect x={0} y={6} width={22} height={4} fill="#003580" />
      {/* Blue vertical bar */}
      <rect x={5} y={0} width={4} height={16} fill="#003580" />
    </svg>
  )
}

function FlagNO() {
  return (
    <svg viewBox="0 0 22 16" width={28} height={20} aria-label="Norge" role="img">
      {/* Red background */}
      <rect width={22} height={16} fill="#EF2B2D" />
      {/* White cross — horizontal */}
      <rect x={0} y={5} width={22} height={6} fill="#FFFFFF" />
      {/* White cross — vertical */}
      <rect x={4} y={0} width={6} height={16} fill="#FFFFFF" />
      {/* Blue inner cross — horizontal */}
      <rect x={0} y={6} width={22} height={4} fill="#003680" />
      {/* Blue inner cross — vertical */}
      <rect x={5} y={0} width={4} height={16} fill="#003680" />
    </svg>
  )
}

function FlagIS() {
  return (
    <svg viewBox="0 0 22 16" width={28} height={20} aria-label="Ísland" role="img">
      {/* Dark blue background */}
      <rect width={22} height={16} fill="#003897" />
      {/* White cross — horizontal */}
      <rect x={0} y={5} width={22} height={6} fill="#FFFFFF" />
      {/* White cross — vertical */}
      <rect x={4} y={0} width={6} height={16} fill="#FFFFFF" />
      {/* Red inner cross — horizontal */}
      <rect x={0} y={6} width={22} height={4} fill="#DC1E35" />
      {/* Red inner cross — vertical */}
      <rect x={5} y={0} width={4} height={16} fill="#DC1E35" />
    </svg>
  )
}

const FLAGS: Record<CountryCode, () => JSX.Element> = {
  SE: FlagSE,
  DK: FlagDK,
  FI: FlagFI,
  NO: FlagNO,
  IS: FlagIS,
}

const COUNTRIES: CountryCode[] = ['SE', 'DK', 'FI', 'NO', 'IS']

/* -------------------------------------------------------------------------- */
/* Dismissible top banner for international visitors                           */
/* -------------------------------------------------------------------------- */

function InternationalBanner() {
  const { locale } = useLocale()
  const [dismissed, setDismissed] = useState(false)

  if (locale.country === 'SE' || dismissed) return null

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-1.5"
      style={{ backgroundColor: '#C8A96E' }}
      role="banner"
    >
      <span className="font-sans text-xs text-white/90 leading-snug">
        Vi levererar till hela Norden via PostNord. Leveranstid{' '}
        <strong>{locale.deliveryDays}</strong>.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="ml-4 text-white/80 hover:text-white transition-colors flex-shrink-0"
        aria-label="Stäng banner"
      >
        <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path
            d="M1 1l12 12M13 1L1 13"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
          />
        </svg>
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Main switcher                                                               */
/* -------------------------------------------------------------------------- */

export default function LanguageSwitcher() {
  const { locale, setCountry } = useLocale()

  return (
    <>
      <InternationalBanner />
      <div
        className="fixed top-4 right-4 md:top-5 md:right-6 z-50 flex gap-1.5"
        role="navigation"
        aria-label="Välj land"
      >
        {COUNTRIES.map((code) => {
          const FlagComponent = FLAGS[code]
          const isActive = locale.country === code
          return (
            <button
              key={code}
              onClick={() => setCountry(code)}
              aria-label={`Byt till ${code}`}
              aria-pressed={isActive}
              className={`
                relative flex items-center justify-center rounded-sm transition-transform duration-150
                hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1
                focus:ring-yellow-400
                ${isActive ? 'ring-2 ring-yellow-400 ring-offset-1 scale-105' : ''}
              `}
              style={{ width: 32, height: 24 }}
            >
              <FlagComponent />
            </button>
          )
        })}
      </div>
    </>
  )
}
