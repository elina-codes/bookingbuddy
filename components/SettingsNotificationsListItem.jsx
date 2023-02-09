import { useContext } from "react";
import * as RNP from "react-native-paper";
import { formattedDate, dateToDay } from "../common/helpers";
import { useAppTheme } from "../common/theme";
import { NotifyContext } from "../common/Context";
import { useNavigation } from "@react-navigation/native";
import { Animated } from "react-native";
import { useShakeAnimation } from "../common/hooks/useShakeAnimation";

export default function SettingsNotificationsListItem({
  id,
  facility,
  spotsWanted,
  date,
  slot,
}) {
  const { newSpaceAlerts, deleteNotifyMap } = useContext(NotifyContext);
  const theme = useAppTheme();
  const navigation = useNavigation();
  const shake = useShakeAnimation(newSpaceAlerts.has(id), newSpaceAlerts);

  return (
    <RNP.Card
      style={{
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: theme.colors.background,
      }}
    >
      <RNP.List.Item
        onPress={() => {
          navigation.navigate("Schedule", {
            facility,
            tab: dateToDay(date),
          });
        }}
        style={{
          paddingRight: 10,
          paddingBottom: 0,
          paddingTop: 0,
        }}
        title={`${formattedDate(date)}  •  ${slot}`}
        description={`${spotsWanted} space${spotsWanted > 1 ? "s" : ""}`}
        descriptionStyle={{ opacity: 0.6 }}
        right={(props) =>
          newSpaceAlerts.has(id) ? (
            <Animated.View
              style={{
                transform: [{ translateX: shake.current }],
              }}
            >
              <RNP.IconButton
                {...props}
                icon="bell-ring"
                iconColor={theme.colors.primary}
                style={{ marginRight: 0 }}
              />
            </Animated.View>
          ) : (
            <RNP.IconButton
              {...props}
              iconColor={theme.colors.onSurfaceDisabled}
              style={{ marginRight: 0 }}
              icon="close-circle"
              onPress={() => {
                deleteNotifyMap(id);
              }}
            />
          )
        }
      />
    </RNP.Card>
  );
}
