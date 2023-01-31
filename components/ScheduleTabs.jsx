import { LinearGradient } from "expo-linear-gradient";
import {
  formattedDate,
  getThemeGradient,
  overmorrow,
  tomorrow,
} from "../common/helpers";
import { View } from "react-native";
import ScheduleTab from "./ScheduleTab";
import { ThemeContext } from "../common/ThemeContext";
import { useContext } from "react";

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
      label: formattedDate(tomorrow, true),
      value: "tomorrow",
      showBadge: showTomorrowBadge,
    },
    {
      label: formattedDate(overmorrow, true),
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
