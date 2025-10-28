import { useRef, useLayoutEffect } from 'react';

/**
 * Hook to prevent scroll position from jumping when content changes
 * Uses MutationObserver to detect DOM changes and maintain scroll position
 */
export const useScrollLock = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollPositionRef = useRef<number>(0);
  const isScrollingRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Track scroll position continuously
    const saveScrollPosition = () => {
      if (!isScrollingRef.current) {
        scrollPositionRef.current = container.scrollTop;
      }
    };

    // Restore scroll position immediately
    const restoreScrollPosition = () => {
      if (container && scrollPositionRef.current !== undefined) {
        isScrollingRef.current = true;
        container.scrollTop = scrollPositionRef.current;
        // Reset flag after a short delay
        setTimeout(() => {
          isScrollingRef.current = false;
        }, 50);
      }
    };

    // Listen to scroll events to always have latest position
    container.addEventListener('scroll', saveScrollPosition, { passive: true });

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver((mutations) => {
      // Immediately restore position on any DOM change
      restoreScrollPosition();
    });

    // Observe the container and all its children
    observer.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      container.removeEventListener('scroll', saveScrollPosition);
      observer.disconnect();
    };
  }, []);

  return scrollContainerRef;
};

