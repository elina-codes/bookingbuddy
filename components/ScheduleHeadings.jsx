import * as RNP from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../common/theme";

export default function ScheduleHeadings() {
  const theme = useAppTheme();

  return (
    <>
      <View style={styles.notificationSection}>
        <RNP.Text
          variant="labelMedium"
          style={{
            color: theme.colors.inverseOnSurface,
            flex: 1,
          }}
        >
          Slot / Availability
        </RNP.Text>
        <RNP.Text
          variant="labelMedium"
          style={{
            color: theme.colors.inverseOnSurface,
            marginRight: 30,
            width: 120,
            textAlign: "center",
          }}
        >
          Spaces wanted
        </RNP.Text>
        <RNP.Text
          variant="labelMedium"
          style={{
            color: theme.colors.inverseOnSurface,
          }}
        >
          Alert
        </RNP.Text>
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
    paddingRight: 28,
    padding: 10,
  },
});
