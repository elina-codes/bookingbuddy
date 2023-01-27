import * as RNP from "react-native-paper";
import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { LinearGradient } from "expo-linear-gradient";

export default function ScheduleTabs({
  onTabChange,
  dateToShow,
  currentTheme,
}) {
  const theme = useAppTheme();

  const getOvermorrowDate = () => {
    var today = new Date();
    var overmorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    var options = { month: "short", day: "numeric" };
    return overmorrow.toLocaleDateString("en-US", options);
  };

  const style = {
    borderColor: theme.colors.tertiary,
    borderRadius: 0,
    borderWidth: 0,
    justifyContent: "center",
    height: 50,
  };

  const contentStyle = {
    height: 50,
    borderRadius: 0,
  };

  return (
    <LinearGradient
      colors={currentTheme === "default" ? redGradient : blueGradient}
      start={{ x: 0, y: 6 }}
      end={{ x: 1.4, y: 0 }}
    >
      <RNP.SegmentedButtons
        value={dateToShow}
        onValueChange={onTabChange}
        style={{ borderRadius: 0 }}
        buttons={[
          {
            label: "Today",
            value: "today",
            textColor: theme.colors.primary,
            contentStyle,
            style: {
              ...style,
              backgroundColor:
                dateToShow === "today" ? "rgba(30,30,30,0.8)" : "transparent",
            },
          },
          {
            label: "Tomorrow",
            value: "tomorrow",
            contentStyle,
            textColor: theme.colors.primary,
            style: {
              ...style,
              backgroundColor:
                dateToShow === "tomorrow"
                  ? "rgba(30,30,30,0.8)"
                  : "transparent",
            },
          },
          {
            label: getOvermorrowDate(),
            value: "overmorrow",
            contentStyle,
            textColor: theme.colors.primary,
            style: {
              ...style,
              backgroundColor:
                dateToShow === "overmorrow"
                  ? "rgba(30,30,30,0.8)"
                  : "transparent",
            },
          },
        ]}
      />
    </LinearGradient>
  );
}
