import { View, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "../common/theme";

export default function NotificationsSection({
  isNotifyAllOn,
  setSpotsWanted,
  spotsWanted,
  toggleNotifications,
}) {
  const theme = useAppTheme();

  return (
    <>
      <View style={styles.notificationSection}>
        <View style={styles.flex}>
          <RNP.Text
            style={{
              color: theme.colors.tertiary,
            }}
          >
            Minimum spaces required:
          </RNP.Text>

          <View>
            <Picker
              style={{
                width: 75,
                color: theme.colors.inverseSurface,
                fontWeight: "bold",
                borderWidth: 1,
                borderColor: theme.colors.tertiary,
                borderStyle: "solid",
              }}
              dropdownIconColor={theme.colors.inverseSurface}
              selectedValue={spotsWanted}
              onValueChange={(itemValue) => setSpotsWanted(itemValue)}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker>
          </View>
          {/* <RNP.Switch value={isNotifyAllOn} onValueChange={toggleNotifications} /> */}
        </View>
        <RNP.Button
          icon={isNotifyAllOn ? "bell-off-outline" : "bell"}
          iconColor={theme.colors.tertiary}
          onPress={toggleNotifications}
        >
          Toggle All {isNotifyAllOn ? "OFF" : "ON"}
        </RNP.Button>
      </View>
      <RNP.Divider />
    </>
  );
}

const styles = StyleSheet.create({
  notificationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
  },
  flex: {
    alignItems: "center",
    flexDirection: "row",
  },
});
