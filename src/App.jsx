import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from './hooks/useLenis';
import Layout from './components/Layout';
import Hero from './components/sections/Hero';
import BackToTop from './components/BackToTop';
import LoadingScreen from './components/LoadingScreen';

// Lazy load non-critical sections
const Features = lazy(() => import('./components/sections/Features'));
const Portfolio = lazy(() => import('./components/sections/Portfolio'));
const Resume = lazy(() => import('./components/sections/Resume'));
const Contact = lazy(() => import('./components/sections/Contact'));

// Loading Fallback Component
const PageLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(() => {
    // Only show loading screen once per session
    return !sessionStorage.getItem('hasLoaded');
  });

  // Initialize Lenis smooth scroll
  useLenis();

  // Scroll to top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    sessionStorage.setItem('hasLoaded', 'true');
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Layout>
            <Hero />
            <Suspense fallback={<PageLoader />}>
              <Features />
              <Portfolio />
              <Resume />
              <Contact />
            </Suspense>
            <BackToTop />
          </Layout>
        </motion.div>
      )}
    </>
  );
}

export default App;

