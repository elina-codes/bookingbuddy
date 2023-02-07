import { useContext } from "react";
import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as RNP from "react-native-paper";
import { ThemeContext } from "../common/Context";
import { getThemeGradient } from "../common/helpers";
import { useAppTheme } from "../common/theme";
import { themeColors } from "../common/constants";

export default function SettingsTheme() {
  const theme = useAppTheme();
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  const ThemeSwatch = ({ color }) => {
    const isCurrentTheme = color === currentTheme;
    return (
      <Pressable
        onPress={() => setCurrentTheme(color)}
        style={{
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
              width: 60,
              height: 60,
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
    <RNP.List.Section title="Theme" titleStyle={{ fontSize: 16 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        {Object.values(themeColors).map((color) => (
          <ThemeSwatch key={color} color={color} />
        ))}
      </View>
    </RNP.List.Section>
  );
}
