import { ScrollView } from "react-native";
import * as RNP from "react-native-paper";
import { facilities, facilityIcons } from "../common/constants";
import { useAppTheme } from "../common/theme";
import { useAssets } from "expo-asset";

export default function Home({ navigation }) {
  const theme = useAppTheme();
  const [assets, error] = useAssets([
    require("../assets/crashpad.png"),
    require("../assets/rope.png"),
  ]);

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
            title = splitName[1];
            description = splitName[0];
          }
          return (
            <RNP.List.Item
              {...{
                onPress: () => navigation.navigate("Schedule", { facility }),
                title,
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
