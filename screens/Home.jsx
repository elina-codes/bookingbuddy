import { useContext } from "react";
import { ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { facilities } from "../common/constants";
import { NotifyContext } from "../common/Context";
import { useAppTheme } from "../common/theme";

export default function Home({ navigation }) {
  const { facilityTabBadges } = useContext(NotifyContext);
  const theme = useAppTheme();

  const hasBadges = (facility) => {
    const facilityTabs = facilityTabBadges.get(facility);
    return facilityTabs?.size > 0;
  };

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: theme.colors.background,
          flex: 1,
        }}
      >
        <RNP.List.Section>
          {Object.entries(facilities).map(([facility, details]) => {
            const { title, location, icon } = details;
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
                  description: location,
                  descriptionStyle: { opacity: 0.6 },
                  key: facility,
                  left: (props) =>
                    icon && (
                      <RNP.List.Icon
                        {...props}
                        icon={icon}
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
    </>
  );
}
