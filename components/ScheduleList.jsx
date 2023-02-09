import { useEffect, useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import ScheduleListItem from "./ScheduleListItem";

export default function ScheduleList({ currentSchedule, spotsWanted }) {
  const [schedule, setSchedule] = useState(currentSchedule);

  useEffect(() => {
    setSchedule(currentSchedule);
  }, [currentSchedule]);

  return (
    <ScrollView>
      <RNP.List.Section style={{ paddingLeft: 10, paddingRight: 10 }}>
        {schedule?.length > 0 ? (
          schedule.map((item) => {
            const { id } = item;
            return (
              <ScheduleListItem
                {...{
                  data: item,
                  key: id,
                  spotsWanted,
                }}
              />
            );
          })
        ) : (
          <View style={styles.noResults}>
            <RNP.Text variant="bodyLarge">No availabilities</RNP.Text>
          </View>
        )}
      </RNP.List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  noResults: {
    alignItems: "center",
    padding: 20,
  },
});
