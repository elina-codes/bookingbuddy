import { useContext, useEffect, useState } from "react";
import { ScrollView } from "react-native";
import * as RNP from "react-native-paper";
import { getFacilityTitleAndLocation } from "../common/helpers";
import { NotifyContext } from "../common/Context";
import SettingsNotificationsListItem from "./SettingsNotificationsListItem";
import SettingsNotificationsClearButton from "./SettingsNotificationsClearButton";

export default function SettingsNotifications() {
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
      <SettingsNotificationsClearButton />
    </RNP.List.Section>
  );
}
