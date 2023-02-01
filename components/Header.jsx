import { useContext } from "react";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";
import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../common/Context";
import { getThemeGradient } from "../common/helpers";

export default function Header() {
  const { currentTheme } = useContext(ThemeContext);
  const theme = useAppTheme();

  return (
    <LinearGradient
      colors={getThemeGradient(currentTheme)}
      start={{ x: 0, y: 2 }}
      end={{ x: 1, y: 0 }}
    >
      <RNP.Appbar.Header
        style={{
          backgroundColor: "transparent",
          backgroundImage: theme.colors.gradient,
        }}
      />
    </LinearGradient>
  );
}
