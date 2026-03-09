import type { Metadata } from 'next';

// Favicon configuration for the APMO application
export const faviconConfig: Metadata['icons'] = {
  icon: [
    {
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
  ],
  apple: [
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  ],
  shortcut: '/favicon.ico',
};

// PWA and manifest configuration
export const manifestConfig = {
  manifest: '/manifest.json',
  themeColor: '#073890',
  applicationName: 'APMO',
  appleWebApp: {
    title: 'APMO',
    statusBarStyle: 'default' as const,
  },
} as const;

// Complete metadata configuration with SEO and favicon support
export const getAppMetadata = (): Metadata => ({
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://apmo.org'),
  title: {
    default: 'APMO - Asian Pacific Mathematics Olympiad',
    template: '%s | APMO',
  },
  description:
    'Official website of the Asian Pacific Mathematics Olympiad - promoting excellence in mathematics across the Asia-Pacific region since 1989.',
  keywords: [
    'APMO',
    'Asian Pacific Mathematics Olympiad',
    'Mathematics',
    'Competition',
    'Students',
    'Education',
  ],
  authors: [{ name: 'APMO Organization' }],
  creator: 'APMO Organization',
  publisher: 'APMO Organization',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'APMO - Asian Pacific Mathematics Olympiad',
    description:
      'Official website of the Asian Pacific Mathematics Olympiad - promoting excellence in mathematics across the Asia-Pacific region since 1989.',
    siteName: 'APMO',
    images: [
      {
        url: '/android-chrome-512x512.png',
        width: 512,
        height: 512,
        alt: 'APMO Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APMO - Asian Pacific Mathematics Olympiad',
    description:
      'Official website of the Asian Pacific Mathematics Olympiad - promoting excellence in mathematics across the Asia-Pacific region since 1989.',
    images: ['/android-chrome-512x512.png'],
    creator: '@apmo',
  },
  icons: faviconConfig,
  manifest: manifestConfig.manifest,
  applicationName: manifestConfig.applicationName,
  appleWebApp: manifestConfig.appleWebApp,
  other: {
    'msapplication-TileColor': '#073890',
    'msapplication-config': '/browserconfig.xml',
    'mobile-web-app-capable': 'yes',
  },
});
