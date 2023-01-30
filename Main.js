import { useContext, useEffect, useState } from "react";
import { FacilityContext } from "./common/FacilityContext";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import Header from "./components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Schedule from "./screens/Schedule";
import Home from "./screens/Home";

export default function Main() {
  const [currentTheme, setCurrentTheme] = useState("default");
  // const [facility, setFacility] = useState("");

  const { facility } = useContext(FacilityContext);

  const updateTheme = () => {
    setCurrentTheme((prev) => (prev === "default" ? "blue" : "default"));
  };

  const storeTheme = async (value) => {
    try {
      await AsyncStorage.setItem("theme", value);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    storeTheme(currentTheme);
  }, [currentTheme]);

  useEffect(() => {
    const getTheme = async () => {
      try {
        const value = await AsyncStorage.getItem("theme");
        if (value !== null) {
          setCurrentTheme(value);
        }
      } catch (e) {
        console.error(e);
      }
    };
    getTheme();
  }, []);

  return (
    <>
      <Header {...{ currentTheme, updateTheme }} />
      {facility ? <Schedule {...{ currentTheme, facility }} /> : <Home />}
    </>
  );
}
