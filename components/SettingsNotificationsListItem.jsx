import { useContext } from "react";
import * as RNP from "react-native-paper";
import { formattedDate, dateToDay, dateToFromNow } from "../common/helpers";
import { useAppTheme } from "../common/theme";
import { NotifyContext } from "../common/Context";
import { useNavigation } from "@react-navigation/native";
import { Animated, View } from "react-native";
import { useShakeAnimation } from "../common/hooks/useShakeAnimation";

export default function SettingsNotificationsListItem({
  id,
  facility,
  spotsWanted,
  date,
  slot,
}) {
  const { newSpaceAlerts, deleteWatchedMap } = useContext(NotifyContext);
  const theme = useAppTheme();
  const navigation = useNavigation();
  const shake = useShakeAnimation(newSpaceAlerts.has(id), newSpaceAlerts);

  const DateIcon = () => {
    const [day, month, dayNum] = formattedDate(date).split(" ");
    return (
      <View
        style={{
          width: 55,
          marginLeft: 10,
          padding: 5,
          borderRadius: 10,
          backgroundColor: theme.colors.darkGrey,
          alignSelf: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {newSpaceAlerts.has(id) ? (
          <Animated.View
            style={{
              transform: [{ translateX: shake.current }],
            }}
          >
            <RNP.IconButton
              icon="bell-ring"
              iconColor={theme.colors.primary}
              style={{ marginRight: 0 }}
            />
          </Animated.View>
        ) : (
          <>
            <RNP.Text
              style={{
                margin: 0,
                textAlign: "center",
                lineHeight: 30,
                fontSize: 30,
              }}
            >
              {dayNum}
            </RNP.Text>
            <RNP.Text
              style={{ margin: 0, lineHeight: 14, textAlign: "center" }}
            >
              {month}
            </RNP.Text>
          </>
        )}
      </View>
    );
  };

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
            tab: dateToFromNow(date),
          });
        }}
        style={{
          paddingRight: 10,
          paddingBottom: 0,
          paddingTop: 0,
        }}
        title={`${dateToFromNow(date, true)}  •  ${slot}`}
        description={`${spotsWanted} space${spotsWanted > 1 ? "s" : ""}`}
        descriptionStyle={{ opacity: 0.6 }}
        left={() => <DateIcon />}
        right={(props) => (
          <RNP.IconButton
            {...props}
            iconColor={theme.colors.onSurfaceDisabled}
            style={{ marginRight: 0 }}
            icon="close-circle"
            onPress={() => {
              deleteWatchedMap(id);
            }}
          />
        )}
      />
    </RNP.Card>
  );
}
