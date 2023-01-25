import { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";
import ScheduleListItem from "./ScheduleListItem";

export default function ScheduleList({ isNotifyAllOn, currentSchedule }) {
  return (
    <ScrollView>
      <RNP.List.Section>
        {currentSchedule?.length > 0 ? (
          currentSchedule.map((item, index) => {
            return (
              <ScheduleListItem
                {...{ data: item, key: index, isNotifyAllOn }}
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
