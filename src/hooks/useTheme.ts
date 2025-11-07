// hooks/useTheme.ts
import { useContext } from 'react';
import { ThemeContext, type ThemeContextType } from '@/providers/themeContext';
// import { ThemeContext, ThemeContextType } from '@/contexts/ThemeContext';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};