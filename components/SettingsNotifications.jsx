import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { getFacilityTitleAndLocation } from "../common/helpers";
import { useAppTheme } from "../common/theme";
import { NotifyContext, ThemeContext } from "../common/Context";
import SettingsNotificationsListItem from "./SettingsNotificationsListItem";

export default function SettingsNotifications({ navigation, closeModal }) {
  const { currentTheme } = useContext(ThemeContext);
  const theme = useAppTheme(currentTheme);

  const { notifyMap, deleteNotifyMap, clearNotifyMap } =
    useContext(NotifyContext);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [groupedNotifications, setGroupedNotifications] = useState([]);

  const onDeletePress = () => {
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirm = () => {
    clearNotifyMap();
    setShowDeleteConfirm(false);
  };

  const onDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const groupByFacility = (data) =>
    data.reduce((acc, [id, item]) => {
      const { facility, spotsWanted, date, slot } = item || {};
      if (!acc[facility]) {
        acc[facility] = [];
      }
      acc[facility].push({ id, spotsWanted, date, slot });
      return acc;
    }, {});

  useEffect(() => {
    const grouped = groupByFacility([...notifyMap]);
    setGroupedNotifications(Object.entries(grouped));
  }, [notifyMap]);

  return (
    <RNP.List.Section style={{ flex: 1 }} titleStyle={{ fontSize: 16 }}>
      <ScrollView>
        {groupedNotifications.length > 0 ? (
          groupedNotifications.map(([facility, notifications]) => (
            <RNP.Card
              style={{
                margin: 8,
                marginLeft: 15,
                marginRight: 15,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              key={facility}
            >
              <RNP.List.Section
                title={getFacilityTitleAndLocation(facility)}
                style={{
                  marginTop: 0,
                }}
              >
                {notifications
                  .sort((a, b) => a["id"].localeCompare(b["id"]))
                  .map(({ id, spotsWanted, date, slot }) => {
                    return (
                      <SettingsNotificationsListItem
                        {...{
                          key: `NotificationList-${id}`,
                          id,
                          facility,
                          spotsWanted,
                          date,
                          slot,
                          navigation,
                          closeModal,
                        }}
                      />
                    );
                  })}
              </RNP.List.Section>
            </RNP.Card>
          ))
        ) : (
          <RNP.Card style={{ margin: 10, padding: 20 }}>
            <RNP.Text>No notifications</RNP.Text>
          </RNP.Card>
        )}
      </ScrollView>

      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          marginBottom: 10,
          ...(showDeleteConfirm && {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }),
        }}
      >
        {showDeleteConfirm ? (
          <RNP.Text>Are you sure?</RNP.Text>
        ) : (
          <RNP.Button
            icon={"bell-off"}
            disabled={showDeleteConfirm || notifyMap.size === 0}
            textColor={theme.colors.text}
            style={{ width: "100%" }}
            mode="outlined"
            onPress={onDeletePress}
          >
            Turn off all notifications
          </RNP.Button>
        )}
        {showDeleteConfirm && (
          <View style={{ flexDirection: "row" }}>
            <RNP.Button
              mode="outlined"
              onPress={onDeleteCancel}
              style={{ marginLeft: 10, marginRight: 10 }}
            >
              Cancel
            </RNP.Button>
            <RNP.Button
              mode="outlined"
              textColor={theme.colors.errorContainer}
              onPress={onDeleteConfirm}
            >
              Yes, delete all
            </RNP.Button>
          </View>
        )}
      </View>
    </RNP.List.Section>
  );
}
