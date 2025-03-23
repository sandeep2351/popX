
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const usePageTransition = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Add animation class to the main content on route change
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.classList.add('page-transition');
      
      // Clean up animation class
      return () => {
        mainContent.classList.remove('page-transition');
      };
    }
  }, [location.pathname]);
};
