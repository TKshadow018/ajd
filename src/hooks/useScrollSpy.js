import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for scroll spy functionality - tracks which section is active based on scroll position
 * @param {string[]} sectionIds - Array of section IDs to track
 * @param {number} offset - Offset from top of viewport (default: 200)
 * @returns {{ activeSection: string, scrollToSection: (sectionId: string) => void }}
 */
export const useScrollSpy = (sectionIds, offset = 200) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  const scrollToSection = useCallback((sectionId, scrollOffset = 150) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - scrollOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { activeSection, scrollToSection };
};

export default useScrollSpy;
