import { View } from "react-native";
import { useAppTheme } from "../common/theme";
import SettingsNotifications from "../components/SettingsNotifications";

export default function Notifications() {
  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        flex: 1,
        padding: 10,
      }}
    >
      <SettingsNotifications />
    </View>
  );
}
