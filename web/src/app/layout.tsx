'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stockz',
  description: 'A melhor fonte de análise do mercado acionário brasileiro.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()

  return (
    <html lang="pt" className="bg-neutral-900 text-white">
      <QueryClientProvider client={queryClient}>
        <body className={nunito.className}>{children}</body>
      </QueryClientProvider>
    </html>
  )
}

export default RootLayout
