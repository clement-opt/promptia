import './globals.css'

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
    <html lang="fr">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  )
}
