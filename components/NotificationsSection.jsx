import * as RNP from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { useAppTheme } from "../common/theme";
import NumericInput from "react-native-numeric-input";

export default function NotificationsSection({ setSpotsWanted, spotsWanted }) {
  const theme = useAppTheme();

  return (
    <>
      <View style={styles.notificationSection}>
        <View style={styles.flex}>
          <RNP.Text
            variant="bodyLarge"
            style={{
              color: theme.colors.inverseOnSurface,
            }}
          >
            Minimum spaces wanted:
          </RNP.Text>

          <View style={{ margin: 10, marginLeft: 10 }}>
            <NumericInput
              {...{
                minValue: 1,
                maxValue: 4,
                initValue: spotsWanted,
                textColor: theme.colors.inverseSurface,
                onChange: (value) => setSpotsWanted(value),
                rightButtonBackgroundColor: theme.colors.surfaceDisabled,
                leftButtonBackgroundColor: theme.colors.surfaceDisabled,
                iconStyle: { color: theme.colors.inverseSurface },
                borderColor: theme.colors.surface,
                separatorWidth: 0,
                rounded: true,
                reachMaxIncIconStyle: { color: theme.colors.surfaceDisabled },
                reachMinDecIconStyle: { color: theme.colors.surfaceDisabled },
                totalHeight: 45,
              }}
            />
            {/* <Picker
              mode="dropdown"
              style={{
                width: 100,
                color: theme.colors.inverseSurface,
                fontWeight: "bold",
              }}
              dropdownIconColor={theme.colors.inverseSurface}
              selectedValue={spotsWanted}
              onValueChange={(itemValue) => setSpotsWanted(itemValue)}
              color={theme.colors.inverseSurface}
            >
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
            </Picker> */}
          </View>
        </View>
      </View>
      <RNP.Divider />
    </>
  );
}

const styles = StyleSheet.create({
  notificationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 15,
  },
  flex: {
    alignItems: "center",
    flexDirection: "row",
  },
});
