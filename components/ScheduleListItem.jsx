import { useContext, useEffect, useState } from "react";
import * as RNP from "react-native-paper";
import { Animated } from "react-native";
import { NotifyContext } from "../common/Context";
import { useAppTheme } from "../common/theme";
import { useShakeAnimation } from "../common/hooks/useShakeAnimation";
import ScheduleListItemSpotsInput from "./ScheduleListItemSpotsInput";

export default function ScheduleListItem({ data, disableNotify }) {
  const { availability, facility, slot, id, date } = data;
  const { watchedMap, newSpaceAlerts, updateWatchedMap, deleteWatchedMap } =
    useContext(NotifyContext);
  const theme = useAppTheme();

  const [isNotifyOn, setIsNotifyOn] = useState(watchedMap.has(id));
  const [newSpotsWanted, setNewSpotsWanted] = useState(
    watchedMap.get(id)?.spotsWanted || 1
  );

  const shake = useShakeAnimation(newSpaceAlerts.has(id), newSpaceAlerts);

  const updateWatched = () =>
    updateWatchedMap({
      id,
      facility,
      date,
      slot,
      availability,
      spotsWanted: parseInt(newSpotsWanted),
    });

  const toggleNotifications = () => {
    if (watchedMap.has(id)) {
      deleteWatchedMap(id);
      setIsNotifyOn(false);
    } else {
      updateWatched();
      setIsNotifyOn(true);
    }
  };

  useEffect(() => {
    if (watchedMap.has(id)) {
      updateWatched();
    }
  }, [newSpotsWanted]);

  useEffect(() => {
    setIsNotifyOn(watchedMap.has(id));
  }, [watchedMap.get(id)]);

  const availabilityIconMap = (availability = []) => {
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

  const getIcon = () => {
    if (newSpaceAlerts.has(id)) {
      return "bell-ring";
    } else if (isNotifyOn) {
      return "bell-outline";
    } else {
      return "bell-off-outline";
    }
  };

  const getIconColor = () =>
    newSpaceAlerts.has(id) || isNotifyOn
      ? theme.colors.primary
      : theme.colors.surfaceVariant;

  return (
    // <RNP.Card style={{ margin: 5 }}>
    <RNP.List.Item
      titleStyle={availability === "Full" ? { opacity: 0.6 } : {}}
      descriptionStyle={availability === "Full" ? { opacity: 0.6 } : {}}
      title={slot}
      description={availability}
      rippleColor="transparent"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 10,
      }}
      left={(props) => {
        const { color, icon } = availabilityIconMap(availability);
        return <RNP.List.Icon {...{ ...props, color, icon }} />;
      }}
      right={(props) => (
        <>
          {isNotifyOn && (
            <ScheduleListItemSpotsInput
              {...{
                initValue: newSpotsWanted,
                onChange: (val) => setNewSpotsWanted(val),
              }}
            />
          )}
          <Animated.View
            style={{
              transform: [{ translateX: shake.current }],
            }}
          >
            <RNP.IconButton
              {...props}
              onPress={toggleNotifications}
              icon={getIcon()}
              iconColor={getIconColor()}
              disabled={disableNotify}
            />
          </Animated.View>
        </>
      )}
    />
    // </RNP.Card>
  );
}
