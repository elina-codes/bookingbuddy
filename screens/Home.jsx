import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, View } from "react-native";
import * as RNP from "react-native-paper";
import { facilities, facilityColors } from "../common/constants";
import { blueGradient, redGradient, useAppTheme } from "../common/theme";
import { useAssets } from "expo-asset";
import { useContext } from "react";
import { ThemeContext } from "../common/ThemeContext";

export default function Home({ navigation }) {
  const { currentTheme } = useContext(ThemeContext);
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
        style={{ justifyContent: "center", padding: 5, flex: 1 }}
      >
        {facilities.map((facility, i) => (
          <LinearGradient
            colors={
              facilityColors[facility] === "red" ? redGradient : blueGradient
            }
            start={{ x: 0, y: 2 }}
            end={{ x: 1, y: 0 }}
            style={{ margin: 10, flex: 1, borderRadius: 10 }}
            key={facility}
          >
            <Pressable
              onPress={() => {
                navigation.navigate("Schedule", {
                  facility,
                  currentTheme: facilityColors[facility],
                });
              }}
              style={{
                flex: 1,
                height: 180,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.background,
                margin: 4,
                padding: 20,
                paddingTop: 30,
                paddingBottom: 30,
                borderRadius: 10,
              }}
            >
              {assets && (
                <Image
                  source={assets[i]}
                  style={{
                    width: 100,
                    height: 100,
                    opacity: 0.6,
                  }}
                />
              )}
              <RNP.Text
                variant="headlineMedium"
                style={{ textAlign: "center" }}
              >
                {facility}
              </RNP.Text>
            </Pressable>
          </LinearGradient>
          // <RNP.List.Item
          //   onPress={() => setFacility(facility)}
          //   title={facility}
          //   key={facility}
          //   right={(props) => <RNP.List.Icon {...props} icon="chevron-right" />}
          // />
        ))}
      </RNP.List.Section>
    </View>
  );
}
