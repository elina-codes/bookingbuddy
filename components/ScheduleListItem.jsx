import { useEffect, useState } from "react";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";

export default function ScheduleListItem({ data, notify, updateNotifySlots }) {
  const { availability, slot, id } = data;
  const theme = useAppTheme();
  const [isNotifyOn, setIsNotifyOn] = useState(notify);

  const toggleNotifications = () => {
    updateNotifySlots(id, !notify);
  };

  useEffect(() => {
    setIsNotifyOn(notify);
  }, [notify]);

  const availabilityColorMap = (availability) => {
    switch (availability) {
      case "Full":
        return theme.colors.errorContainer;
      case "Available":
        return theme.colors.success;
      default:
        return theme.colors.warning;
    }
  };

  const availabilityIconMap = (availability) => {
    switch (availability) {
      case "Full":
        return "block-helper";
      case "Available":
        return "check-circle";
      default:
        return "alert-circle";
    }
  };

  return (
    <RNP.List.Item
      titleStyle={availability === "Full" ? { opacity: 0.5 } : {}}
      descriptionStyle={availability === "Full" ? { opacity: 0.5 } : {}}
      title={slot}
      description={availability}
      rippleColor="transparent"
      style={{ paddingTop: 0, paddingBottom: 0 }}
      left={(props) => (
        <RNP.List.Icon
          {...props}
          color={availabilityColorMap(availability)}
          icon={availabilityIconMap(availability)}
        />
      )}
      right={(props) => (
        <RNP.IconButton
          {...props}
          onPress={toggleNotifications}
          icon={isNotifyOn ? "bell" : "bell-off-outline"}
          iconColor={
            isNotifyOn ? theme.colors.primary : theme.colors.surfaceVariant
          }
        />
      )}
    />
  );
}
