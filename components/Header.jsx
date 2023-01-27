import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { LinearGradient } from "expo-linear-gradient";

export default function Header({ currentTheme, updateTheme }) {
  const theme = useAppTheme();

  const onWebsitePress = () => {
    Linking.openURL(
      "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p"
    );
  };

  return (
    <LinearGradient
      colors={currentTheme === "default" ? redGradient : blueGradient}
      start={{ x: 0, y: 2 }}
      end={{ x: 1, y: 0 }}
    >
      <RNP.Appbar.Header
        style={{
          // backgroundColor: theme.colors.onTertiary,
          backgroundColor: "transparent",
          backgroundImage: theme.colors.gradient,
        }}
      >
        <RNP.Appbar.Content
          title="Hive Booking Buddy"
          color={theme.colors.inverseSurface}
        />
        <RNP.Appbar.Action
          icon="palette"
          color={theme.colors.inverseSurface}
          onPress={updateTheme}
        />
        <RNP.Appbar.Action
          icon="open-in-new"
          color={theme.colors.inverseSurface}
          onPress={onWebsitePress}
        />
      </RNP.Appbar.Header>
    </LinearGradient>
  );
}
