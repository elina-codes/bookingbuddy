import { MD3DarkTheme as DefaultTheme, useTheme } from "react-native-paper";

export const blueGradient = ["#051937", "#004d7a", "#008793", "#00bf72"];
export const redGradient = [
  // "#000066",
  "#57006b",
  "#8a0067",
  "#b8005f",
  "#db0054",
  "#f63741",
  "#ff692e",
  "#ff970f",
  // "#ffbf00",
  // "#ffea00",
];

// "#000066",
// "#57006b",
// "#8a0067",
// "#b8005f",
// "#db0054",
// "#f63741",
// "#ff692e",
// "#ff970f",
// "#ffbf00",
// "#ffea00",

// rgb(0, 0, 102)
// rgb(87, 0, 107)
// rgb(138, 0, 103)
// rgb(184, 0, 95)
// rgb(219, 0, 84)
// rgb(246, 55, 65)
// rgb(255, 105, 46)
// rgb(255, 151, 15)
// rgb(255, 191, 0)
// rgb(255, 234, 0)
export const theme = {
  ...DefaultTheme,
  // Specify custom property
  dark: true,
  mode: "exact",
  // Specify custom property in nested object
  colors: {
    gradients: {
      primary: [
        // "#000066",
        "#57006b",
        "#8a0067",
        "#b8005f",
        "#db0054",
        "#f63741",
        "#ff692e",
        // "#ff970f",
        // "#ffbf00",
        // "#ffea00",
      ],
      secondary: [
        "#051937",
        "#004d7a",
        "#008793",
        "#00bf72",
        // "#a8eb12",
      ],
    },
    primary: "#00ffd2",
    onPrimary: "rgb(0, 0, 102)",
    primaryContainer: "rgb(87, 0, 107)",
    onPrimaryContainer: "rgb(219, 0, 84)",
    secondary: "rgb(193, 202, 171)",
    onSecondary: "rgb(43, 51, 29)",
    secondaryContainer: "rgb(65, 74, 50)",
    onSecondaryContainer: "rgb(221, 230, 198)",
    tertiary: "rgb(160, 208, 201)",
    onTertiary: "rgb(184, 0, 95)",
    tertiaryContainer: "#008793",
    onTertiaryContainer: "#ffbf00",
    error: "rgb(255, 180, 171)",
    onError: "rgb(219, 0, 84)",
    errorContainer: "rgb(246, 55, 65)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(27, 28, 24)",
    onBackground: "rgb(228, 227, 219)",
    surface: "rgb(27, 28, 24)",
    onSurface: "rgb(228, 227, 219)",
    surfaceVariant: "rgb(69, 72, 61)",
    onSurfaceVariant: "rgb(197, 200, 185)",
    outline: "rgb(143, 146, 132)",
    outlineVariant: "rgb(69, 72, 61)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(228, 227, 219)",
    inverseOnSurface: "rgb(48, 49, 44)",
    inversePrimary: "rgb(73, 104, 13)",
    success: "#a8eb12",
    warning: "rgb(255, 191, 0)",
    elevation: {
      level0: "transparent",
      level1: "rgb(34, 37, 28)",
      level2: "rgb(39, 43, 31)",
      level3: "rgb(43, 48, 34)",
      level4: "rgb(45, 50, 34)",
      level5: "rgb(48, 54, 36)",
    },
    surfaceDisabled: "rgba(228, 227, 219, 0.12)",
    onSurfaceDisabled: "rgba(228, 227, 219, 0.38)",
    backdrop: "rgba(46, 50, 39, 0.4)",
  },
};

const darkTheme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    primary: "rgb(187, 195, 255)",
    onPrimary: "rgb(23, 39, 120)",
    primaryContainer: "rgb(49, 63, 144)",
    onPrimaryContainer: "rgb(222, 224, 255)",
    secondary: "rgb(195, 197, 221)",
    onSecondary: "rgb(45, 47, 66)",
    secondaryContainer: "rgb(67, 69, 89)",
    onSecondaryContainer: "rgb(224, 225, 249)",
    tertiary: "rgb(230, 186, 215)",
    onTertiary: "rgb(68, 38, 61)",
    tertiaryContainer: "rgb(93, 60, 84)",
    onTertiaryContainer: "rgb(255, 215, 241)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(27, 27, 31)",
    onBackground: "rgb(228, 225, 230)",
    surface: "rgb(27, 27, 31)",
    onSurface: "rgb(228, 225, 230)",
    surfaceVariant: "rgb(70, 70, 79)",
    onSurfaceVariant: "rgb(199, 197, 208)",
    outline: "rgb(144, 144, 154)",
    outlineVariant: "rgb(70, 70, 79)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(228, 225, 230)",
    inverseOnSurface: "rgb(48, 48, 52)",
    inversePrimary: "rgb(74, 88, 169)",
    elevation: {
      level0: "transparent",
      level1: "rgb(35, 35, 42)",
      level2: "rgb(40, 40, 49)",
      level3: "rgb(45, 46, 56)",
      level4: "rgb(46, 47, 58)",
      level5: "rgb(49, 51, 62)",
    },
    surfaceDisabled: "rgba(228, 225, 230, 0.12)",
    onSurfaceDisabled: "rgba(228, 225, 230, 0.38)",
    backdrop: "rgba(47, 48, 56, 0.4)",
  },
};

export const useAppTheme = () => useTheme(theme);
