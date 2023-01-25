import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { useAppTheme } from "../common/theme";

export default function Header() {
  const theme = useAppTheme();

  const onWebsitePress = () => {
    Linking.openURL(
      "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p"
    );
  };

  return (
    <RNP.Appbar.Header
      style={{
        backgroundColor: theme.colors.onTertiary,
      }}
    >
      <RNP.Appbar.Content
        title="Hive Booking Buddy"
        color={theme.colors.inverseSurface}
      />
      <RNP.Appbar.Action
        icon="open-in-new"
        color={theme.colors.inverseSurface}
        onPress={onWebsitePress}
      />
    </RNP.Appbar.Header>
  );
}
