
import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  dark_mode: boolean;
  toggle_dark_mode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark_mode, set_dark_mode] = useState<boolean>(false);

  useEffect(() => {
    // Check if user previously enabled dark mode
    const stored_preference = localStorage.getItem('dark_mode');
    const prefer_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial dark mode state based on stored preference or system preference
    if (stored_preference !== null) {
      set_dark_mode(stored_preference === 'true');
    } else {
      set_dark_mode(prefer_dark);
    }
  }, []);

  useEffect(() => {
    // Update document class when dark mode changes
    if (dark_mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store preference
    localStorage.setItem('dark_mode', dark_mode.toString());
  }, [dark_mode]);

  const toggle_dark_mode = () => {
    set_dark_mode(!dark_mode);
  };

  return (
    <DarkModeContext.Provider value={{ dark_mode, toggle_dark_mode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
}
