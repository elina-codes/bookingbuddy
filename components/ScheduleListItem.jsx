import { useCallback, useContext, useEffect, useRef, useState } from "react";
import * as RNP from "react-native-paper";
import { NotifyContext } from "../common/Context";
import { useAppTheme } from "../common/theme";
import NumericInput from "react-native-numeric-input";
import { Animated, View } from "react-native";

export default function ScheduleListItem({ data }) {
  const { availability, facility, slot, id, date } = data;
  const theme = useAppTheme();
  const {
    notifyMap,
    newSpaceAlerts,
    deleteNewSpaceAlert,
    updateNotifyMap,
    deleteNotifyMap,
  } = useContext(NotifyContext);
  const [isNotifyOn, setIsNotifyOn] = useState(notifyMap.has(id));
  const [notifySpots, setNotifySpots] = useState(
    notifyMap.get(id)?.spotsWanted || 1
  );

  const anim = useRef(new Animated.Value(0));

  const shake = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 30,
          useNativeDriver: true,
        }),
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 30,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 3 }
    ).start();
  }, []);

  const toggleNotifications = () => {
    if (notifyMap.has(id)) {
      deleteNotifyMap(id);
      setIsNotifyOn(false);
    } else {
      updateNotifyMap({
        id,
        facility,
        date,
        slot,
        availability,
        spotsWanted: parseInt(notifySpots),
      });
      setIsNotifyOn(true);
    }
  };

  useEffect(() => {
    if (notifyMap.has(id)) {
      updateNotifyMap({
        id,
        facility,
        date,
        slot,
        availability,
        spotsWanted: parseInt(notifySpots),
      });
    }
  }, [notifySpots]);

  useEffect(() => {
    if (newSpaceAlerts.has(id)) {
      shake();
      setTimeout(() => {
        deleteNewSpaceAlert(id);
      }, 8000);
    }
  }, [newSpaceAlerts]);

  useEffect(() => {
    setIsNotifyOn(notifyMap.get(id));
  }, [notifyMap.get(id)]);

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

  const getIcon = () => {
    if (newSpaceAlerts.has(id)) {
      return "bell-ring";
    } else if (isNotifyOn) {
      return "bell";
    } else {
      return "bell-off-outline";
    }
  };

  const getIconColor = () => {
    if (newSpaceAlerts.has(id)) {
      return theme.colors.success;
    } else if (isNotifyOn) {
      return theme.colors.primary;
    } else {
      return theme.colors.surfaceVariant;
    }
  };

  return (
    <RNP.List.Item
      titleStyle={availability === "Full" ? { opacity: 0.6 } : {}}
      descriptionStyle={availability === "Full" ? { opacity: 0.6 } : {}}
      title={slot}
      description={availability}
      rippleColor="transparent"
      style={{
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 20,
      }}
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
        <>
          {isNotifyOn && (
            <View style={{ alignSelf: "center", marginRight: 10 }}>
              <NumericInput
                {...{
                  minValue: 1,
                  maxValue: 4,
                  initValue: notifySpots,
                  textColor: theme.colors.inverseSurface,
                  onChange: (value) => setNotifySpots(value),
                  rightButtonBackgroundColor: theme.colors.surfaceDisabled,
                  leftButtonBackgroundColor: theme.colors.surfaceDisabled,
                  iconStyle: { color: theme.colors.inverseSurface },
                  borderColor: theme.colors.surface,
                  separatorWidth: 0,
                  rounded: true,
                  reachMaxIncIconStyle: { color: theme.colors.surfaceDisabled },
                  reachMinDecIconStyle: { color: theme.colors.surfaceDisabled },
                  totalHeight: 45,
                  totalWidth: 120,
                }}
              />
            </View>
          )}
          <Animated.View style={{ transform: [{ translateX: anim.current }] }}>
            <RNP.IconButton
              {...props}
              onPress={toggleNotifications}
              icon={getIcon()}
              iconColor={getIconColor()}
            />
          </Animated.View>
        </>
      )}
    />
  );
}
