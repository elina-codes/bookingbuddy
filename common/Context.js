import { createContext, useState } from "react";

/* Theme */

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState("default");
  // const storeTheme = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("theme", value);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   storeTheme(currentTheme);
  // }, [currentTheme]);

  // useEffect(() => {
  //   const getThemeGradient = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("theme");
  //       if (value !== null) {
  //         setCurrentTheme(value);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getThemeGradient();
  // }, []);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/* Notifications */

export const NotifyContext = createContext();

export const NotifyProvider = ({ children }) => {
  const [watchedMap, setWatchedMap] = useState(new Map([]));
  const [facilityTabBadges, setFacilityTabBadges] = useState(new Map([]));
  const [newSpaceAlerts, setNewSpaceAlerts] = useState(new Set());

  const updateWatchedMap = ({
    id,
    facility,
    date,
    slot,
    availability,
    spotsWanted,
  }) => {
    setWatchedMap((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, { facility, date, slot, availability, spotsWanted });
      return newMap;
    });
  };

  const deleteWatchedMap = (id) => {
    setWatchedMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(id);
      return newMap;
    });
  };

  const clearWatchedMap = () => {
    setWatchedMap(new Map([]));
  };

  const addNewSpaceAlert = (id) => {
    setNewSpaceAlerts((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  };

  const deleteNewSpaceAlert = (id) => {
    setNewSpaceAlerts((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const addFacilityTabBadge = (facility, tab) => {
    setFacilityTabBadges((prev) => {
      const newMap = new Map(prev);
      const currentTabs = newMap.get(facility);
      const newSet = new Set(currentTabs);
      newSet.add(tab);
      newMap.set(facility, newSet);
      return newMap;
    });
  };

  const deleteFacilityTabBadge = (facility, tab) => {
    setFacilityTabBadges((prev) => {
      const newMap = new Map(prev);
      const currentTabs = newMap.get(facility);
      const newSet = new Set(currentTabs);
      newSet.delete(tab);
      newMap.set(facility, newSet);
      return newMap;
    });
  };

  return (
    <NotifyContext.Provider
      value={{
        watchedMap,
        clearWatchedMap,
        updateWatchedMap,
        deleteWatchedMap,
        facilityTabBadges,
        addFacilityTabBadge,
        deleteFacilityTabBadge,
        newSpaceAlerts,
        addNewSpaceAlert,
        deleteNewSpaceAlert,
      }}
    >
      {children}
    </NotifyContext.Provider>
  );
};
