import { useEffect, useState } from "react";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";

export default function ScheduleListItem({ data, isNotifyAllOn }) {
  const [isNotifyOn, setIsNotifyOn] = useState(isNotifyAllOn);
  const theme = useAppTheme();
  const { availability, slot } = data;

  const toggleNotifications = () => setIsNotifyOn(!isNotifyOn);

  useEffect(() => {
    setIsNotifyOn(isNotifyAllOn);
  }, [isNotifyAllOn]);

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
        return theme.colors.primary;
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
      onPress={toggleNotifications}
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
          icon={isNotifyOn ? "bell-ring" : "bell-off-outline"}
          iconColor={
            isNotifyOn
              ? theme.colors.onTertiaryContainer
              : theme.colors.tertiaryContainer
          }
          // onPress={toggleNotifications}
        />
      )}
    />
  );
}
