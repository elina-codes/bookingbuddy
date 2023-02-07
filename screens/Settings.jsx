import { View } from "react-native";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";
import SettingsTheme from "../components/SettingsTheme";

export default function Settings({ showSettingsModal, setShowSettingsModal }) {
  const theme = useAppTheme();
  const closeModal = () => setShowSettingsModal(false);

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
              alignItems: "center",
              flexDirection: "row",
              paddingLeft: 10,
            }}
          >
            <RNP.Title>Settings</RNP.Title>
            <RNP.IconButton icon="close" onPress={closeModal} />
          </View>
          <SettingsTheme />
        </View>
      </RNP.Modal>
    </RNP.Portal>
  );
}
