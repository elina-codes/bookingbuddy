import { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import {
  getThemeGradient,
  overmorrowFormatted,
  tomorrowFormatted,
} from "../common/helpers";
import { ThemeContext } from "../common/Context";
import ScheduleTab from "./ScheduleTab";
import { scheduleDays } from "../common/constants";

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
      value: scheduleDays.today,
      showBadge: showTodayBadge,
    },
    {
      label: tomorrowFormatted,
      value: scheduleDays.tomorrow,
      showBadge: showTomorrowBadge,
    },
    {
      label: overmorrowFormatted,
      value: scheduleDays.overmorrow,
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
