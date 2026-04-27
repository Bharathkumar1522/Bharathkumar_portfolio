'use client';

import { useCallback, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TextureOverlay from '@/components/TextureOverlay';
import LoadingScreen from '@/components/LoadingScreen';
import BackToTop from '@/components/BackToTop';
import { useLenis } from '@/hooks/useLenis';

// Dynamic import: CustomCursor only on desktop, no SSR
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), {
  ssr: false,
});

export default function ClientLayout({ children }) {
  const [showLoading, setShowLoading] = useState(true); // Always true initially to match server

  useEffect(() => {
    // Hide loading screen if returning visitor
    if (sessionStorage.getItem('hasLoaded')) {
      setShowLoading(false);
    }
  }, []);

  // Initialize Lenis smooth scroll
  useLenis();

  const handleLoadingComplete = useCallback(() => {
    setShowLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  }, []);

  return (
    <>
      <AnimatePresence>
        {showLoading && (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      <div className="min-h-screen w-full overflow-x-hidden relative">
        <TextureOverlay
          type="noise"
          className="fixed opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0"
        />
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <BackToTop />
    </>
  );
}
