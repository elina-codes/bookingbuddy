import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { View } from "react-native";
import { useAppTheme } from "../common/theme";
import { facilities } from "../common/constants";

export default function ScheduleBookButton({ facility }) {
  const theme = useAppTheme();

  const onWebsitePress = () => {
    Linking.openURL(facilities[facility].bookingLink);
  };

  return (
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
  );
}
