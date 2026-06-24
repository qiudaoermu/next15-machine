'use client'

import { ReactNode } from 'react'
import { Header } from './layout/header'
import { Footer } from './layout/footer'
import { LocaleProvider } from '@/context/LocaleContext'
import { LiveChatButton } from './LiveChatButton'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <LocaleProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <LiveChatButton />
      </div>
    </LocaleProvider>
  )
}
