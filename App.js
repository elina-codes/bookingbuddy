import FacilityProvider from "./common/FacilityContext";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./common/theme";
import Main from "./Main";

export default function App() {
  const theme = useAppTheme();

  return (
    <FacilityProvider>
      <PaperProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Main />
        </SafeAreaProvider>
      </PaperProvider>
    </FacilityProvider>
  );
}
