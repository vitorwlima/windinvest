import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { QueryProvider } from './QueryProvider'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stockz',
  applicationName: 'Stockz',
  description: 'A melhor fonte de análise do mercado acionário brasileiro.',
  viewport: 'width=device-width, initial-scale=1',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt" className="bg-neutral-900 text-white">
      <QueryProvider>
        <body className={nunito.className}>{children}</body>
      </QueryProvider>
    </html>
  )
}

export default RootLayout
