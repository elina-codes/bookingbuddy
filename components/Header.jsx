import * as RNP from "react-native-paper";
import * as Linking from "expo-linking";
import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useContext } from "react";
import { FacilityContext } from "../common/FacilityContext";
import { links } from "../common/constants";

export default function Header({ currentTheme, updateTheme }) {
  const theme = useAppTheme();
  const { facility, setFacility } = useContext(FacilityContext);

  const onWebsitePress = () => {
    Linking.openURL(links[facility]);
  };

  return (
    <LinearGradient
      colors={currentTheme === "default" ? redGradient : blueGradient}
      start={{ x: 0, y: 2 }}
      end={{ x: 1, y: 0 }}
    >
      <RNP.Appbar.Header
        style={{
          backgroundColor: "transparent",
          backgroundImage: theme.colors.gradient,
        }}
      >
        {facility ? (
          <RNP.Appbar.BackAction onPress={() => setFacility("")} />
        ) : (
          <RNP.Appbar.Action
            icon="carabiner"
            color={theme.colors.inverseSurface}
          />
        )}
        <RNP.Appbar.Content
          title={facility || "Choose a facility"}
          color={theme.colors.inverseSurface}
        />
        <RNP.Appbar.Action
          icon="palette"
          color={theme.colors.inverseSurface}
          onPress={updateTheme}
        />
        {facility && (
          <RNP.Appbar.Action
            icon="open-in-new"
            color={theme.colors.inverseSurface}
            onPress={onWebsitePress}
          />
        )}
      </RNP.Appbar.Header>
    </LinearGradient>
  );
}
