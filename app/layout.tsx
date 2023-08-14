import './globals.css'
import type { Metadata } from 'next'
import { Inter, Roboto } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/components/toaster-provider'
import { CrispProvider } from '@/components/crisp-provider'

const roboto = Roboto({
  weight: "500",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: 'mathos AI Tools',
  description: 'AI alati nastali na mathos-u',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <CrispProvider />
        <body className={roboto.className}>{children}
          <ToasterProvider />
        </body>
      </html>
    </ClerkProvider>
  )
}