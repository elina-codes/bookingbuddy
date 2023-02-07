import { ThemeProvider, NotifyProvider } from "./common/Context";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Main from "./Main";

export default function App() {
  return (
    <ThemeProvider>
      <NotifyProvider>
        <NavigationContainer theme={DarkTheme}>
          <SafeAreaProvider>
            <StatusBar style="light" />
            <Main />
          </SafeAreaProvider>
        </NavigationContainer>
      </NotifyProvider>
    </ThemeProvider>
  );
}
