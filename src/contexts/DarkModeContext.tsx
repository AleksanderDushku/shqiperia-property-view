
import React, { createContext, useContext, useEffect, useState } from 'react';

type DarkModeContextType = {
  dark_mode: boolean;
  toggle_dark_mode: () => void;
};

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [dark_mode, set_dark_mode] = useState<boolean>(false);
  const [mounted, set_mounted] = useState<boolean>(false);

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
    
    set_mounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Add transition class before changing theme
    document.documentElement.classList.add('color-theme-in-transition');
    
    // Update document class when dark mode changes
    if (dark_mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store preference
    localStorage.setItem('dark_mode', dark_mode.toString());
    
    // Remove the transition class after transitions complete
    const timeout = setTimeout(() => {
      document.documentElement.classList.remove('color-theme-in-transition');
    }, 750);
    
    return () => clearTimeout(timeout);
  }, [dark_mode, mounted]);

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
