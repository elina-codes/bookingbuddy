import { View } from "react-native";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";
import SettingsNotifications from "../components/SettingsNotifications";
import SettingsTheme from "../components/SettingsTheme";

export default function Settings({
  isSettingsModalVisible,
  toggleSettingsModal,
  notifyMap,
  deleteNotifyMap,
  clearNotifyMap,
}) {
  const theme = useAppTheme();

  return (
    <RNP.Portal>
      <RNP.Modal
        visible={isSettingsModalVisible}
        onDismiss={toggleSettingsModal}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            height: "100%",
            padding: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingLeft: 5,
            }}
          >
            <RNP.Title>Settings</RNP.Title>
            <RNP.IconButton icon="close" onPress={toggleSettingsModal} />
          </View>
          <SettingsTheme />
          <SettingsNotifications
            {...{ notifyMap, deleteNotifyMap, clearNotifyMap }}
          />
        </View>
      </RNP.Modal>
    </RNP.Portal>
  );
}
