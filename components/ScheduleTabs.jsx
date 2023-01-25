import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";

export default function ScheduleTabs({ onTabChange, dateToShow }) {
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
    <RNP.SegmentedButtons
      value={dateToShow}
      onValueChange={onTabChange}
      style={{ borderRadius: 0 }}
      buttons={[
        {
          label: "Today",
          value: "today",
          contentStyle,
          style: {
            ...style,
            backgroundColor:
              dateToShow === "today"
                ? theme.colors.primaryContainer
                : theme.colors.onTertiary,
            // color:
            //   dateToShow === "today"
            //     ? theme.colors.surface
            //     : theme.colors.inverseSurface,
          },
        },
        {
          label: "Tomorrow",
          value: "tomorrow",
          contentStyle,
          style: {
            ...style,
            backgroundColor:
              dateToShow === "tomorrow"
                ? theme.colors.primaryContainer
                : theme.colors.onTertiary,
            // color:
            //   dateToShow === "tomorrow"
            //     ? theme.colors.surface
            //     : theme.colors.inverseSurface,
          },
        },
        {
          label: getOvermorrowDate(),
          value: "overmorrow",
          contentStyle,
          style: {
            ...style,
            backgroundColor:
              dateToShow === "overmorrow"
                ? theme.colors.primaryContainer
                : theme.colors.onTertiary,
            // color:
            //   dateToShow === "overmorrow"
            //     ? theme.colors.surface
            //     : theme.colors.inverseSurface,
          },
        },
      ]}
    />
  );
}
