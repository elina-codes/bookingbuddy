import { createContext, useState } from "react";

/* Theme */

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("default");

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* Notifications */

export const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
  const [notifyMap, setNotifyMap] = useState(new Map([]));
  const [facilityTabBadges, setFacilityTabBadges] = useState(new Map([]));

  const updateNotifyMap = (id, slot, availability, spotsWanted) => {
    setNotifyMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { slot, availability, spotsWanted });
      return newMap;
    });
  };

  const deleteNotifyMap = (id) => {
    setNotifyMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const addFacilityTabBadge = (facility, tab) => {
    setFacilityTabBadges((prev) => {
      const newMap = new Map(prev);
      const currentTabs = newMap.get(facility);
      const newSet = new Set(currentTabs);
      newSet.add(tab);
      newMap.set(facility, currentTabs);
      return newMap;
    });
  };

  const deleteFacilityTabBadge = (facility, tab) => {
    setFacilityTabBadges((prev) => {
      const newMap = new Map(prev);
      const currentTabs = newMap.get(facility);
      const newSet = new Set(currentTabs);
      newSet.delete(tab);
      newMap.set(facility, currentTabs);
      return newMap;
    });
  };

  const clearNotifyMap = () => {
    setNotifyMap(new Map([]));
  };

  return (
    <NotifyContext.Provider
      value={{
        notifyMap,
        clearNotifyMap,
        updateNotifyMap,
        deleteNotifyMap,
        facilityTabBadges,
        addFacilityTabBadge,
        deleteFacilityTabBadge,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};
