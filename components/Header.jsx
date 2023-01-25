import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";

export default function Header() {
  const theme = useAppTheme();

  return (
    <RNP.Appbar.Header
    style={{
      backgroundColor: theme.colors.primary,
    }}
  >
    <RNP.Appbar.Content
      title="Hive Vancouver Availability"
      color="#fff"
    />
    <RNP.Appbar.Action icon="cog" color="#fff" onPress={() => {}} />
  </RNP.Appbar.Header>
  )
}