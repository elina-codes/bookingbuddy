import { MD3DarkTheme as DefaultTheme, useTheme } from "react-native-paper";

export const tealGradient = ["#051937", "#004d7a", "#008793", "#00bf72"];
export const goldGradient = [
  "#5c1c00",
  "#742f06",
  "#873f08",
  "#9a5209",
  "#af6408",
  "#bf7908",
  "#d49008",
  "#e2a808",
];
export const greenGradient = [
  "#023300",
  "#0C4106",
  "#1C520A",
  "#295F0C",
  "#3B710E",
  "#4B810E",
  "#5F950E",
  "#70A20B",
  "#87B607",
  "#9CC700",
];
export const redGradient = [
  "#57006b",
  "#8a0067",
  "#b8005f",
  "#db0054",
  "#f63741",
  "#ff692e",
  "#ff970f",
];
export const purpleGradient = [
  "#004fe0",
  "#2a4fe5",
  "#3e4cea",
  "#4f49ee",
  "#5f45f2",
  "#6f42f5",
  "#7c39f9",
  "#8932fb",
  "#9926fd",
  "#a71aff",
];
// [
//   "#271958",
//   "#2e216e",
//   "#302985",
//   "#303197",
//   "#2d3aae",
//   "#2344c7",
//   "#004fe0",
//   "#005aff",
// ];

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

const colors = {
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
  error: "rgb(246, 55, 65)",
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
  inverseOnSurface: "rgb(148, 149, 144)",
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
  darkGrey: "rgba(150, 150, 150, 0.08)",
  backdrop: "rgba(46, 50, 39, 0.4)",
};

export const theme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  colors,
};

export const tealTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  colors: {
    ...colors,
    primary: "#00b3bf",
  },
};

export const greenTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  colors: {
    ...colors,
    primary: "#87B607",
  },
};
export const purpleTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  colors: {
    ...colors,
    primary: "#7191f9",
  },
};

export const goldTheme = {
  ...DefaultTheme,
  dark: true,
  mode: "exact",
  colors: {
    ...colors,
    primary: "#e2a808",
  },
};

export const useAppTheme = () => useTheme(theme);
