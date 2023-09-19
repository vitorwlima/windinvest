import { ptBR } from '@clerk/localizations'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { QueryProvider } from './QueryProvider'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wind Invest',
  applicationName: 'Wind Invest',
  description: 'Análise automatizada do mercado acionário brasileiro.',
  viewport: 'width=device-width, initial-scale=1',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider localization={ptBR}>
      <QueryProvider>
        <html lang="pt" className="bg-neutral-900 text-neutral-50">
          <body
            className={`flex min-h-screen flex-col justify-between ${nunito.className}`}
          >
            {children}
          </body>
        </html>
      </QueryProvider>
    </ClerkProvider>
  )
}

export default RootLayout
