import { DM_Sans } from 'next/font/google'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'PromptIA - Générateur de prompts IA | OPT Conseil',
  description:
    "Générez des prompts IA professionnels en quelques clics. 3 modes : Express, Structuré, Expert. Par OPT Conseil.",
  openGraph: {
    title: 'PromptIA - Générateur de prompts IA | OPT Conseil',
    description: "Votre assistant pour créer des prompts IA puissants et fiables.",
    siteName: 'OPT Conseil',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={dmSans.variable} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#080112" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('opt_promptia_theme') === 'light') {
                  document.documentElement.classList.add('light');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
