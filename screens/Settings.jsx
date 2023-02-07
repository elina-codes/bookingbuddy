import { useContext } from "react";
import { View } from "react-native";
import * as RNP from "react-native-paper";
import { NotifyContext, ThemeContext } from "../common/Context";
import { useAppTheme } from "../common/theme";
import SettingsNotifications from "../components/SettingsNotifications";
import SettingsTheme from "../components/SettingsTheme";
import { useNavigation } from "@react-navigation/native";

export default function Settings({ showSettingsModal, setShowSettingsModal }) {
  const theme = useAppTheme();
  const closeModal = () => setShowSettingsModal(false);
  const navigation = useNavigation();

  return (
    <RNP.Portal>
      <RNP.Modal visible={showSettingsModal} onDismiss={closeModal}>
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
            <RNP.IconButton icon="close" onPress={closeModal} />
          </View>
          <SettingsTheme />
          <SettingsNotifications {...{ navigation, closeModal }} />
        </View>
      </RNP.Modal>
    </RNP.Portal>
  );
}
