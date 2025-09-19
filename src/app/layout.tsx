import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { IBM_Plex_Mono } from 'next/font/google';

const fontMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Ledgerly',
  description: 'A modern personal finance dashboard.',
  icons: {
    icon: '/fevicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn('font-body antialiased', fontMono.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
