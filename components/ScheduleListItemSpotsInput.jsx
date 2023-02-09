import { useAppTheme } from "../common/theme";
import NumericInput from "react-native-numeric-input";
import { View } from "react-native";

export default function ScheduleListItemSpotsInput({
  initValue = 1,
  onChange = () => {},
}) {
  const theme = useAppTheme();

  return (
    <View style={{ alignSelf: "center" }}>
      <NumericInput
        {...{
          minValue: 1,
          maxValue: 4,
          initValue,
          onChange,
          textColor: theme.colors.inverseSurface,
          rightButtonBackgroundColor: theme.colors.darkGrey,
          leftButtonBackgroundColor: theme.colors.darkGrey,
          iconStyle: { color: theme.colors.inverseSurface },
          borderColor: theme.colors.surface,
          separatorWidth: 0,
          rounded: true,
          totalHeight: 45,
          totalWidth: 120,
          reachMaxIncIconStyle: {
            color: theme.colors.surfaceDisabled,
          },
          reachMinDecIconStyle: {
            color: theme.colors.surfaceDisabled,
          },
        }}
      />
    </View>
  );
}
