import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-on-scroll--visible');
        }
      });
    }, {
      threshold: 0.1, // Trigger when 10% of the element is visible
      rootMargin: '0px 0px -50px 0px'
    });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []); // Re-run if needed, but for simple pages this is fine
}
