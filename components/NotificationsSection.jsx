import { View, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "../common/theme";

export default function NotificationsSection({
  isNotifyOn,
  setSpotsWanted,
  spotsWanted,
  toggleNotifications,
}) {
  const theme = useAppTheme();

  return (
    <View style={styles.notificationSection}>
      <View style={styles.flex}>
        <RNP.Text style={{ color: theme.colors.primary, paddingLeft: 10 }}>
          Notify when at least
        </RNP.Text>

        <View>
          <Picker
            style={{
              width: 80,
            }}
            selectedValue={spotsWanted}
            onValueChange={(itemValue) => setSpotsWanted(itemValue)}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
          </Picker>
        </View>
        <RNP.Text style={{ color: theme.colors.primary }}>
          space{spotsWanted != 1 && "s"} open{spotsWanted == 1 && "s"} up
        </RNP.Text>
      </View>

      <RNP.Switch value={isNotifyOn} onValueChange={toggleNotifications} />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
  },
  notificationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
