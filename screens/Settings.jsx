import { View } from "react-native";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";
import SettingsTheme from "../components/SettingsTheme";

export default function Settings() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        flex: 1,
        padding: 10,
      }}
    >
      <SettingsTheme />
    </View>
  );
}
