import { useContext } from "react";
import { View } from "react-native";
import * as RNP from "react-native-paper";
import { facilities } from "../common/constants";
import { FacilityContext } from "../common/FacilityContext";
import { useAppTheme } from "../common/theme";

export default function Home() {
  const { setFacility } = useContext(FacilityContext);
  const theme = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        flex: 1,
      }}
    >
      <RNP.List.Section>
        {facilities.map((facility) => {
          return (
            <RNP.List.Item
              onPress={() => setFacility(facility)}
              title={facility}
              key={facility}
              right={(props) => (
                <RNP.List.Icon {...props} icon="chevron-right" />
              )}
            />
          );
        })}
      </RNP.List.Section>
    </View>
  );
}
