import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import SmoothScroll from '@/src/components/smooth-scroll/smooth-scroll';
import { ReactNode } from 'react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type RootLayoutProps = {
  children: ReactNode;
  modal: ReactNode;
};

export const metadata: Metadata = {
  title: 'JBI',
  description: 'JBI',
};

export default function RootLayout({
  children,
  modal
}: RootLayoutProps) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <SmoothScroll>
          {/* <ScrollManager /> */}
          {children}
          {modal}
        </SmoothScroll>
      </body>
    </html>
  );
}