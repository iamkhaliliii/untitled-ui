import { useState, useEffect } from 'react';
import { useTheme } from '@/providers/theme';

export const useResolvedTheme = (overrideTheme?: 'light' | 'dark'): 'light' | 'dark' => {
  const { theme: contextTheme } = useTheme();
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('dark');

  // Update system theme when media query changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light');
    };

    // Set initial value
    updateSystemTheme();

    // Listen for changes
    mediaQuery.addEventListener('change', updateSystemTheme);

    return () => {
      mediaQuery.removeEventListener('change', updateSystemTheme);
    };
  }, []);

  // Use override theme if provided, otherwise use context theme
  // For system mode, use detected system preference
  if (overrideTheme) return overrideTheme;
  if (contextTheme === 'system') return systemTheme;
  return contextTheme;
}; 