import { useEffect, useState } from "react";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";

export default function ScheduleListItem({
  data,
  isNotifyAllOn,
  notify,
  updateNotifySlots,
}) {
  const { availability, slot, id } = data;
  const theme = useAppTheme();
  const [isNotifyOn, setIsNotifyOn] = useState(notify);

  const toggleNotifications = () => {
    updateNotifySlots(id, !notify);
  };

  useEffect(() => {
    setIsNotifyOn(notify);
  }, [notify]);

  // useEffect(() => {
  //   updateNotifySlots(date, slot, isNotifyAllOn);
  // }, [isNotifyAllOn]);

  const onBookPress = () => {
    Linking.openURL(
      "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p"
    );
  };

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
          // onPress={toggleNotifications}
        />
      )}
    />
  );
}
