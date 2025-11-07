import React from 'react';
import { ThemeContext } from './themeContext';
// import { ThemeContext } from '@/contexts/ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme] = React.useState<'light' | 'dark'>('dark');
  
  const setTheme = React.useCallback((newTheme: 'light' | 'dark') => {
    console.log('Setting theme:', newTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
