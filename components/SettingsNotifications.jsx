import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import { getFacilityTitleAndLocation } from "../common/helpers";
import { NotifyContext } from "../common/Context";
import SettingsNotificationsListItem from "./SettingsNotificationsListItem";
import SettingsNotificationsClearButton from "./SettingsNotificationsClearButton";

export default function SettingsNotifications() {
  const { watchedMap } = useContext(NotifyContext);
  const [groupedNotifications, setGroupedNotifications] = useState([]);

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
    const grouped = groupByFacility([...watchedMap]);
    setGroupedNotifications(Object.entries(grouped));
  }, [watchedMap]);

  return (
    <RNP.List.Section style={{ flex: 1 }} titleStyle={{ fontSize: 16 }}>
      <ScrollView>
        {groupedNotifications.length > 0 ? (
          groupedNotifications.map(([facility, notifications]) => (
            <RNP.Card style={styles.itemCard} key={facility}>
              <RNP.List.Section
                title={getFacilityTitleAndLocation(facility)}
                style={styles.section}
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
          <RNP.Card style={styles.noResults}>
            <RNP.Text>No notifications</RNP.Text>
          </RNP.Card>
        )}
      </ScrollView>
      <SettingsNotificationsClearButton />
    </RNP.List.Section>
  );
}

const styles = StyleSheet.create({
  itemCard: {
    margin: 8,
    paddingTop: 0,
    paddingBottom: 0,
  },
  noResults: {
    padding: 20,
  },
  section: {
    marginTop: 0,
  },
});
