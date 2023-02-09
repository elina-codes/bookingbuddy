import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../common/theme";
import { facilities } from "../common/constants";

export default function ScheduleHeadings({ facility }) {
  const theme = useAppTheme();

  const onWebsitePress = () => {
    Linking.openURL(facilities[facility].bookingLink);
  };

  return (
    <>
      {/* <View style={styles.notificationSection}>
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
      </View> */}
      <View style={{ padding: 10, paddingBottom: 0 }}>
        <RNP.Button
          onPress={onWebsitePress}
          mode="outlined"
          icon="open-in-new"
          style={{ borderColor: theme.colors.surfaceVariant }}
        >
          BOOK A SESSION
        </RNP.Button>
      </View>
    </>
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
