import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("default");

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
