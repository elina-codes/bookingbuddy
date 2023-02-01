import { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { formattedDate } from "../common/helpers";
import { useAppTheme } from "../common/theme";

export default function SettingsNotifications({
  notifyMap,
  deleteNotifyMap,
  clearNotifyMap,
}) {
  const theme = useAppTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const onDeletePress = () => {
    setShowDeleteConfirm(true);
  };

  const onDeleteConfirm = () => {
    clearNotifyMap();
    setShowDeleteConfirm(false);
  };

  const onDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <RNP.List.Section title="Notifications" style={{ flex: 1 }}>
      {/* <RNP.Button
        icon={"bell-off"}
        disabled={notifyMap.size === 0}
        textColor={theme.colors.text}
        mode="outlined"
        onPress={onDeleteConfirm}
      >
        Turn off all notifications
      </RNP.Button> */}
      <View
        style={{
          paddingLeft: 15,
          paddingRight: 15,
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
            disabled={showDeleteConfirm || notifyMap.size === 0}
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
      <ScrollView>
        {[...notifyMap].map(([id, { spotsWanted }]) => {
          const [facility, date, slot] = id.split(",");
          return (
            <RNP.List.Item
              style={{ paddingRight: 10 }}
              key={id}
              title={
                <View>
                  <RNP.Text variant="bodyMedium" style={{ opacity: 0.6 }}>
                    {formattedDate(new Date(date), true)}
                  </RNP.Text>
                  <RNP.Text variant="bodyLarge">
                    {slot}
                    {"   "}•{"   "}
                    {spotsWanted} space{spotsWanted > 1 ? "s" : ""}
                  </RNP.Text>
                </View>
              }
              description={facility}
              // descriptionStyle={{ opacity: 0.6 }}
              right={(props) => (
                <RNP.IconButton
                  {...props}
                  style={{ marginRight: 0 }}
                  icon="delete"
                  onPress={() => {
                    deleteNotifyMap(id);
                  }}
                />
              )}
            />
          );
        })}
      </ScrollView>
    </RNP.List.Section>
  );
}
