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

  const availabilityIconMap = (availability) => {
    const spaces = parseInt(availability.split(" ")[0]);
    const hasFewSpaces = !isNaN(spaces) && spaces < 5;
    if (availability === "Full") {
      return {
        color: theme.colors.errorContainer,
        icon: "block-helper",
      };
    } else if (hasFewSpaces) {
      return {
        color: theme.colors.warning,
        icon: "alert-circle",
      };
    } else {
      return {
        color: theme.colors.success,
        icon: "check-circle",
      };
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
      left={(props) => {
        return (
          <RNP.List.Icon
            {...props}
            color={availabilityIconMap(availability).color}
            icon={availabilityIconMap(availability).icon}
          />
        );
      }}
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
