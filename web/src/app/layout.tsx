import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stockz',
  description: 'A melhor fonte de análise do mercado acionário brasileiro.',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="pt" className="bg-neutral-900 text-white">
      <body className={nunito.className}>{children}</body>
    </html>
  )
}

export default RootLayout
