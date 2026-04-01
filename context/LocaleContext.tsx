'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type CountryCode = 'SE' | 'DK' | 'FI' | 'NO' | 'IS'

export type Locale = {
  country: CountryCode
  currency: string
  symbol: string
  rate: number
  surcharge: number
  label: string
  deliveryDays: string
}

const LOCALES: Record<CountryCode, Locale> = {
  SE: {
    country: 'SE',
    currency: 'SEK',
    symbol: 'kr',
    rate: 1,
    surcharge: 0,
    label: 'Sverige',
    deliveryDays: '2–3 veckor',
  },
  DK: {
    country: 'DK',
    currency: 'DKK',
    symbol: 'kr.',
    rate: 0.67,
    surcharge: 100,
    label: 'Danmark',
    deliveryDays: '3–4 uger',
  },
  FI: {
    country: 'FI',
    currency: 'EUR',
    symbol: '€',
    rate: 0.087,
    surcharge: 100,
    label: 'Suomi',
    deliveryDays: '3–4 viikkoa',
  },
  NO: {
    country: 'NO',
    currency: 'NOK',
    symbol: 'kr',
    rate: 1.07,
    surcharge: 100,
    label: 'Norge',
    deliveryDays: '3–4 uker',
  },
  IS: {
    country: 'IS',
    currency: 'ISK',
    symbol: 'kr.',
    rate: 14.5,
    surcharge: 100,
    label: 'Ísland',
    deliveryDays: '4–5 vikur',
  },
}

/**
 * Converts a SEK amount to the local currency and formats it with the
 * locale symbol. Uses a space as thousands separator for SEK, and a
 * plain integer for all other currencies.
 */
export function formatPrice(sekAmount: number, locale: Locale): string {
  const converted = Math.round(sekAmount * locale.rate)

  if (locale.currency === 'SEK') {
    // Space as thousands separator: 1 195 kr
    const formatted = converted.toLocaleString('sv-SE')
    return `${formatted} ${locale.symbol}`
  }

  if (locale.currency === 'EUR') {
    // EUR: amount then symbol with space
    const formatted = converted.toLocaleString('sv-SE')
    return `${formatted} ${locale.symbol}`
  }

  // DKK, NOK, ISK: amount then symbol
  const formatted = converted.toLocaleString('sv-SE')
  return `${formatted} ${locale.symbol}`
}

type LocaleContextValue = {
  locale: Locale
  setCountry: (country: CountryCode) => void
  locales: Record<CountryCode, Locale>
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function detectCountry(): CountryCode {
  if (typeof navigator === 'undefined') return 'SE'
  const lang = navigator.language?.toLowerCase() ?? ''
  if (lang.startsWith('da')) return 'DK'
  if (lang.startsWith('fi')) return 'FI'
  if (lang.startsWith('nb') || lang.startsWith('nn') || lang.startsWith('no')) return 'NO'
  if (lang.startsWith('is')) return 'IS'
  return 'SE'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [country, setCountryState] = useState<CountryCode>('SE')

  useEffect(() => {
    setCountryState(detectCountry())
  }, [])

  const setCountry = (code: CountryCode) => {
    setCountryState(code)
  }

  return (
    <LocaleContext.Provider
      value={{ locale: LOCALES[country], setCountry, locales: LOCALES }}
    >
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext)
  if (!ctx) {
    throw new Error('useLocale must be used inside <LocaleProvider>')
  }
  return ctx
}
