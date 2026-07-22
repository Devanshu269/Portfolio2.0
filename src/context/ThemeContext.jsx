import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark' });

export const useTheme = () => useContext(ThemeContext);

// Kept as a no-op provider so nothing else breaks if useTheme is called
export const ThemeProvider = ({ children }) => {
  // Always dark — set once on mount, never changes
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.removeAttribute('data-theme'); // use :root defaults
    localStorage.removeItem('theme');
  }
  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};
