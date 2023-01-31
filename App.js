import ThemeProvider, { ThemeContext } from "./common/ThemeContext";
import * as RNP from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./common/theme";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleScreen from "./screens/Schedule";
import HomeScreen from "./screens/Home";
import Header from "./components/Header";
import { useState, useContext } from "react";

const Stack = createNativeStackNavigator();

const ThemeButton = () => {
  const { setCurrentTheme } = useContext(ThemeContext);
  const theme = useAppTheme();

  const updateTheme = () => {
    setCurrentTheme((prev) => (prev === "default" ? "blue" : "default"));
  };

  return (
    <RNP.Appbar.Action
      icon="palette"
      color={theme.colors.inverseSurface}
      onPress={updateTheme}
    />
  );
};

export default function App() {
  const theme = useAppTheme();

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
  //   const getTheme = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("theme");
  //       if (value !== null) {
  //         setCurrentTheme(value);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getTheme();
  // }, []);

  return (
    <NavigationContainer>
      <ThemeProvider>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar style="light" />
            <Stack.Navigator
              screenOptions={{
                headerBackground: (props) => <Header {...props} />,
                headerTintColor: "white",
                headerRight: () => <ThemeButton />,
              }}
            >
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  title: "Choose a facility",
                }}
              />
              <Stack.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={({ route }) => ({
                  title: route.params.facility,
                })}
              />
            </Stack.Navigator>
          </SafeAreaProvider>
        </PaperProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
