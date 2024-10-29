'use client';

import React from 'react';
import type { ReactNode } from 'react';
import { Poppins } from 'next/font/google';
import '@styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import ToastProvider from '@components/ui/ToastProvider';
import Navbar from '@components/shared/Navbar';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});

type AppLayoutProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

const AppLayout = ({ children }: AppLayoutProps) => (
  <html lang="en">
    <body className={poppins.className}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <Navbar />
        <main className="relative box-border">{children}</main>
      </QueryClientProvider>
    </body>
  </html>
);

export default AppLayout;
