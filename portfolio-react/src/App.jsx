import { useEffect, Suspense, lazy } from 'react';
import { useLenis } from './hooks/useLenis';
import Layout from './components/Layout';
import Hero from './components/sections/Hero';
import BackToTop from './components/BackToTop';

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
  // Initialize Lenis smooth scroll
  useLenis();

  // Scroll to top on load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
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
  );
}

export default App;
