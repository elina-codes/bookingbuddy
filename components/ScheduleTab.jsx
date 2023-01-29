import { useState } from "react";
import * as RNP from "react-native-paper";
import { View, Pressable } from "react-native";
import { useAppTheme } from "../common/theme";

export default function ScheduleTab({
  label,
  value,
  showBadge,
  onTabChange,
  dateToShow,
  currentTheme,
}) {
  const [isBadgeVisible, setBadgeVisible] = useState(showBadge);
  const theme = useAppTheme();
  return (
    <Pressable
      onPress={() => {
        setBadgeVisible(false);
        onTabChange(value);
      }}
      textColor={theme.colors.inverseSurface}
      style={{
        backgroundColor:
          dateToShow === value ? "rgba(30,30,30,0.8)" : "transparent",
        borderRadius: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <RNP.Text
        style={{
          marginLeft: 14,
        }}
      >
        {label}
      </RNP.Text>
      <View style={{ width: 14 }}>
        <RNP.Badge
          size={10}
          visible={isBadgeVisible}
          style={{
            backgroundColor:
              currentTheme === "default"
                ? theme.colors.primary
                : theme.colors.onTertiaryContainer,
            marginBottom: 10,
          }}
        />
      </View>
    </Pressable>
  );
}
