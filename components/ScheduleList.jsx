import { View, ScrollView, StyleSheet } from "react-native";
import * as RNP from "react-native-paper";

export default function ScheduleList({ currentSchedule }) {
  const onBookPress = () => {
    Linking.openURL(
      "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63cf60713e8cf&iframeid=&mode=p"
    );
  };

  const availabilityColorMap = (availability) => {
    switch (availability) {
      case "Full":
        return "red";
      case "Available":
        return "green";
      default:
        return "orange";
    }
  };

  const availabilityIconMap = (availability) => {
    switch (availability) {
      case "Full":
        return "block-helper";
      case "Available":
        return "check-circle";
      default:
        return "alert-circle";
    }
  };

  return currentSchedule?.length > 0 ? (
    <ScrollView>
      <RNP.List.Section>
        {currentSchedule.map((item, index) => {
          const { availability, slot } = item;
          return (
            <RNP.List.Item
              style={availability === "Full" ? { opacity: 0.5 } : {}}
              key={index}
              title={slot}
              description={availability}
              left={(props) => (
                <RNP.List.Icon
                  {...props}
                  color={availabilityColorMap(availability)}
                  icon={availabilityIconMap(availability)}
                />
              )}
              // right={(props) =>
              //   availability !== "Full" && (
              //     <RNP.Button {...props} onPress={onBookPress}>
              //       Book
              //     </RNP.Button>
              //   )
              // }
            />
          );
        })}
      </RNP.List.Section>
    </ScrollView>
  ) : (
    <View style={styles.noResults}>
      <RNP.Text variant="bodyLarge">No availabilities to show</RNP.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noResults: {
    alignItems: "center",
    padding: 20,
  },
});
