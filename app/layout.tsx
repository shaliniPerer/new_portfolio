import type {Metadata} from 'next';
import {Inter, JetBrains_Mono} from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Shalini Vithanage | Full Stack Developer Portfolio',
  description: 'Futuristic personal portfolio of a Full Stack Developer. Design optimized for recruitment and visual impact.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}>
      <body className="bg-black text-gray-200 antialiased font-sans" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

