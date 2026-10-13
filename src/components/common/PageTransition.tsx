import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Snappy GSAP page enter animation with transparent blur & slide
    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 14,
        filter: 'blur(6px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.35,
        ease: 'power2.out',
        clearProps: 'filter,transform', // Prevents CSS blur from lingering
      }
    );

    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
};
