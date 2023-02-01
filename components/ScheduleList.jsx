import { View, ScrollView, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import ScheduleListItem from "./ScheduleListItem";

export default function ScheduleList({ currentSchedule, spotsWanted }) {
  return (
    <ScrollView>
      <RNP.List.Section>
        {currentSchedule?.length > 0 ? (
          currentSchedule.map((item) => {
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
            <RNP.Text variant="bodyLarge">No availabilities to show</RNP.Text>
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
