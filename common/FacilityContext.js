import { createContext, useState } from "react";

export const FacilityContext = createContext();

export default function FacilityProvider({ children }) {
  const [facility, setFacility] = useState("");

  return (
    <FacilityContext.Provider value={{ facility, setFacility }}>
      {children}
    </FacilityContext.Provider>
  );
}
