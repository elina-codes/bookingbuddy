import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children, defaultTheme = "" }) {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
