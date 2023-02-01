import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { Pressable, View } from "react-native";
import * as RNP from "react-native-paper";
import { ThemeContext } from "../common/Context";
import { getThemeGradient } from "../common/helpers";
import { useAppTheme } from "../common/theme";

export default function SettingsTheme() {
  const theme = useAppTheme();
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const ThemeSwatch = ({ color }) => {
    const isCurrentTheme = color === currentTheme;
    return (
      <Pressable
        onPress={() => setCurrentTheme(color)}
        style={{
          marginLeft: 10,
          marginRight: 10,
          borderRadius: 4,
          backgroundColor: theme.colors.primary,
          overflow: "hidden",
        }}
        disabled={isCurrentTheme}
      >
        <LinearGradient
          colors={getThemeGradient(color)}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <RNP.IconButton size={50} icon={isCurrentTheme ? "check" : ""} />
          </View>
        </LinearGradient>
      </Pressable>
    );
  };

  return (
    <RNP.List.Section title="Theme">
      <View style={{ flexDirection: "row" }}>
        <ThemeSwatch color="default" />
        <ThemeSwatch color="blue" />
      </View>
    </RNP.List.Section>
  );
}
