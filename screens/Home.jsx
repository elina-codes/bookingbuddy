import { useContext } from "react";
import { ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { facilities, facilityIcons } from "../common/constants";
import { NotifyContext } from "../common/Context";
import { useAppTheme } from "../common/theme";

export default function Home({ navigation }) {
  const theme = useAppTheme();
  const { facilityTabBadges } = useContext(NotifyContext);

  const hasBadges = (facility) => {
    const facilityTabs = facilityTabBadges.get(facility);
    return facilityTabs?.size > 0;
  };

  return (
    <ScrollView
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <RNP.List.Section>
        {Object.values(facilities).map((facility, i) => {
          let title = facility;
          let description = "";
          if (facility.includes(":")) {
            const splitName = facility.split(": ");
            title = splitName[0];
            description = splitName[1];
          }
          return (
            <RNP.List.Item
              {...{
                onPress: () => navigation.navigate("Schedule", { facility }),
                title: (
                  <>
                    <RNP.Text>{title}</RNP.Text>
                    <View>
                      <RNP.Badge
                        visible={hasBadges(facility)}
                        style={{ marginLeft: 5 }}
                        size={10}
                      />
                    </View>
                  </>
                ),
                description,
                descriptionStyle: { opacity: 0.6 },
                key: facility,
                left: (props) =>
                  facilityIcons[facility] && (
                    <RNP.List.Icon
                      {...props}
                      icon={facilityIcons[facility]}
                      color={theme.colors.inverseOnSurface}
                    />
                  ),
                right: (props) => (
                  <RNP.List.Icon {...props} icon="chevron-right" />
                ),
              }}
            />
          );
        })}
      </RNP.List.Section>
    </ScrollView>
  );
}
