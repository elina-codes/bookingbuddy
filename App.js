import { ThemeProvider, NotifyProvider } from "./common/Context";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./common/theme";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import Main from "./Main";

export default function App() {
  const theme = useAppTheme();

  return (
    <ThemeProvider>
      <NotifyProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={DarkTheme}>
            <SafeAreaProvider>
              <StatusBar style="light" />
              <Main />
            </SafeAreaProvider>
          </NavigationContainer>
        </PaperProvider>
      </NotifyProvider>
    </ThemeProvider>
  );
}
