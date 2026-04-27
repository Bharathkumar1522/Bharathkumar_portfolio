import { Poppins, Montserrat } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import ClientLayout from '@/components/ClientLayout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
});

export const metadata = {
  title: 'Bharath Kumar | Frontend Developer & UI/UX Designer',
  description:
    'Passionate Frontend Developer specializing in building responsive, user-centric web applications with modern technologies. Proficient in ReactJS, Tailwind CSS, and Framer Motion.',
  keywords: [
    'Bharath Kumar',
    'Frontend Developer',
    'React Developer',
    'Web Developer',
    'UI/UX Designer',
    'Portfolio',
    'Freelance Web Developer',
  ],
  authors: [{ name: 'Bharath Kumar' }],
  creator: 'Bharath Kumar',
  openGraph: {
    title: 'Bharath Kumar | Frontend Developer & UI/UX Designer',
    description:
      'Passionate Frontend Developer specializing in building responsive, user-centric web applications with modern technologies.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bharath Kumar | Frontend Developer',
    description:
      'Passionate Frontend Developer specializing in responsive, user-centric web apps.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e8ecf1' },
    { media: '(prefers-color-scheme: dark)', color: '#212428' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className={`${poppins.variable} ${montserrat.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
