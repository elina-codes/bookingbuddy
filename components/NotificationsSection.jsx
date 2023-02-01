import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAppTheme } from "../common/theme";
import { bookingLinks } from "../common/constants";

export default function NotificationsSection({
  setSpotsWanted,
  spotsWanted,
  facility,
}) {
  const theme = useAppTheme();

  const onWebsitePress = () => {
    Linking.openURL(bookingLinks[facility]);
  };

  return (
    <>
      <View style={styles.notificationSection}>
        <View style={styles.flex}>
          <RNP.Text
            style={{
              color: theme.colors.inverseSurface,
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
        </View>
        <RNP.IconButton
          icon="open-in-new"
          color={theme.colors.inverseSurface}
          onPress={onWebsitePress}
        />
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
