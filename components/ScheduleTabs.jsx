import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { LinearGradient } from "expo-linear-gradient";
import { formattedDate, overmorrow, tomorrow } from "../common/helpers";
import { View } from "react-native";
import ScheduleTab from "./ScheduleTab";

export default function ScheduleTabs({
  currentTheme,
  showTodayBadge,
  showTomorrowBadge,
  showOvermorrowBadge,
  ...props
}) {
  return (
    <LinearGradient
      colors={currentTheme === "default" ? redGradient : blueGradient}
      start={{ x: 0, y: 6 }}
      end={{ x: 1.4, y: 0 }}
    >
      <View style={{ flexDirection: "row", height: 50 }}>
        <ScheduleTab
          {...{
            label: "Today",
            value: "today",
            showBadge: showTodayBadge,
            currentTheme,
            ...props,
          }}
        />
        <ScheduleTab
          {...{
            label: formattedDate(tomorrow, true),
            value: "tomorrow",
            showBadge: showTomorrowBadge,
            currentTheme,
            ...props,
          }}
        />
        <ScheduleTab
          {...{
            label: formattedDate(overmorrow, true),
            value: "overmorrow",
            showBadge: showOvermorrowBadge,
            currentTheme,
            ...props,
          }}
        />
      </View>
    </LinearGradient>
  );
}
