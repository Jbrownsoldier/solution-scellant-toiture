import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll by temporarily disabling smooth scroll behavior on html and body
    const originalHtmlBehavior = document.documentElement.style.scrollBehavior;
    const originalBodyBehavior = document.body.style.scrollBehavior;
    
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';

    window.scrollTo(0, 0);

    // Set fallback timeout to catch async rendering/mounting issues
    const timer = setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = originalHtmlBehavior;
      document.body.style.scrollBehavior = originalBodyBehavior;
    }, 50);

    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = originalHtmlBehavior;
      document.body.style.scrollBehavior = originalBodyBehavior;
    };
  }, [pathname]);

  return null;
}
