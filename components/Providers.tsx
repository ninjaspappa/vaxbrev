'use client'

import { type ReactNode } from 'react'
import { LocaleProvider } from '../context/LocaleContext'
import LanguageSwitcher from './LanguageSwitcher'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LocaleProvider>
      {children}
      <LanguageSwitcher />
    </LocaleProvider>
  )
}
