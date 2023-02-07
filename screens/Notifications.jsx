import * as RNP from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { useAppTheme } from "../common/theme";
import SettingsNotifications from "../components/SettingsNotifications";

export default function Notifications({
  showNotificationsModal,
  setShowNotificationsModal,
}) {
  const theme = useAppTheme();
  const closeModal = () => setShowNotificationsModal(false);
  const navigation = useNavigation();

  return (
    <RNP.Portal>
      <RNP.Modal visible={showNotificationsModal} onDismiss={closeModal}>
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
              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <RNP.Title>Notifications</RNP.Title>
            <RNP.IconButton icon="close" onPress={closeModal} />
          </View>
          <SettingsNotifications {...{ navigation, closeModal }} />
        </View>
      </RNP.Modal>
    </RNP.Portal>
  );
}
