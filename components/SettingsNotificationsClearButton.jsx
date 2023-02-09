import { useContext, useState } from "react";
import { View } from "react-native";
import * as RNP from "react-native-paper";
import { useAppTheme } from "../common/theme";
import { NotifyContext } from "../common/Context";

export default function SettingsNotificationsClearButton() {
  const theme = useAppTheme();

  const { watchedMap, clearWatchedMap } = useContext(NotifyContext);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const onDeletePress = () => {
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirm = () => {
    clearWatchedMap();
    setShowDeleteConfirm(false);
  };

  const onDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <View
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        marginTop: 10,
        ...(showDeleteConfirm && {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }),
      }}
    >
      {showDeleteConfirm ? (
        <RNP.Text>Are you sure?</RNP.Text>
      ) : (
        <RNP.Button
          icon={"bell-off"}
          disabled={showDeleteConfirm || watchedMap.size === 0}
          textColor={theme.colors.text}
          style={{ width: "100%" }}
          mode="outlined"
          onPress={onDeletePress}
        >
          Turn off all notifications
        </RNP.Button>
      )}

      {showDeleteConfirm && (
        <View style={{ flexDirection: "row" }}>
          <RNP.Button
            mode="outlined"
            onPress={onDeleteCancel}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            Cancel
          </RNP.Button>
          <RNP.Button
            mode="outlined"
            textColor={theme.colors.errorContainer}
            onPress={onDeleteConfirm}
          >
            Yes, delete all
          </RNP.Button>
        </View>
      )}
    </View>
  );
}
