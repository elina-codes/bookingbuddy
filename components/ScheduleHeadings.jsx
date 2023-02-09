import * as RNP from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../common/theme";

export default function ScheduleHeadings() {
  const theme = useAppTheme();

  return (
    <View style={styles.notificationSection}>
      <RNP.IconButton
        icon="check-circle-outline"
        size={20}
        style={{ margin: 0, marginRight: 10 }}
      />
      <RNP.Text
        variant="labelLarge"
        style={{
          flex: 1,
          color: theme.colors.inverseOnSurface,
        }}
      >
        Slot / Availability
      </RNP.Text>
      <RNP.Text
        variant="labelLarge"
        style={{
          color: theme.colors.inverseOnSurface,
          marginRight: 15,
          width: 120,
          flex: 1,
          textAlign: "center",
        }}
      >
        Spaces wanted
      </RNP.Text>
      <RNP.Text
        variant="labelLarge"
        style={{
          color: theme.colors.inverseOnSurface,
        }}
      >
        Alert
      </RNP.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notificationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 28,
    padding: 5,
  },
});
