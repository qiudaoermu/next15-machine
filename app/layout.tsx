import type { Metadata } from 'next'
import './globals.css'
import { AppLayout } from '@/components/AppLayout'

export const metadata: Metadata = {
  title: 'Power Machinery - Professional Lawn Mowers & Garden Equipment',
  description: 'Leading manufacturer of professional lawn mowers and garden machinery. High-quality equipment for global export.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
