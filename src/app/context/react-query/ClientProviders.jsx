'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProv from '../theme/themeProvider';
import Navbar from '@/app/components/navBar/nav';
import { SessionProvider } from 'next-auth/react';


const queryClient = new QueryClient();

export default function ClientProviders({ children }) {
  return (
    <SessionProvider> 
        <QueryClientProvider client={queryClient}>
          <ThemeProv>
            <Navbar/>
            {children}
          </ThemeProv>
      </QueryClientProvider>
    </SessionProvider>
  );
}