import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, View } from "react-native";
import * as RNP from "react-native-paper";
import { facilities } from "../common/constants";
import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { useAssets } from "expo-asset";

export default function Home({ navigation, currentTheme }) {
  const theme = useAppTheme();
  const [assets, error] = useAssets([
    require("../assets/crashpad.png"),
    require("../assets/rope.png"),
  ]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <RNP.List.Section
      // style={{ justifyContent: "center", padding: 5, flex: 1 }}
      >
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
                right: (props) => (
                  <RNP.List.Icon {...props} icon="chevron-right" />
                ),
              }}
            />
          );
        })}
      </RNP.List.Section>
    </View>
  );
}
