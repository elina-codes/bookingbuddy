import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import {
  formattedDate,
  getThemeGradient,
  overmorrow,
  overmorrowFormattedLong,
  tomorrow,
  tomorrowFormattedLong,
} from "../common/helpers";
import { ThemeContext } from "../common/Context";
import ScheduleTab from "./ScheduleTab";

export default function ScheduleTabs({
  showTodayBadge,
  showTomorrowBadge,
  showOvermorrowBadge,
  ...props
}) {
  const { currentTheme } = useContext(ThemeContext);

  const tabs = [
    {
      label: "Today",
      value: "today",
      showBadge: showTodayBadge,
    },
    {
      label: tomorrowFormattedLong,
      value: "tomorrow",
      showBadge: showTomorrowBadge,
    },
    {
      label: overmorrowFormattedLong,
      value: "overmorrow",
      showBadge: showOvermorrowBadge,
    },
  ];

  return (
    <LinearGradient
      colors={getThemeGradient(currentTheme)}
      start={{ x: 0, y: 6 }}
      end={{ x: 1.4, y: 0 }}
    >
      <View style={{ flexDirection: "row", height: 50 }}>
        {tabs.map((tab) => (
          <ScheduleTab
            {...{
              ...tab,
              key: tab.value,
              currentTheme,
              ...props,
            }}
          />
        ))}
      </View>
    </LinearGradient>
  );
}
