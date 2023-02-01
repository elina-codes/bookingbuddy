import { ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { formattedDate } from "../common/helpers";
import { useAppTheme } from "../common/theme";

export default function Settings({
  isSettingsModalVisible,
  toggleSettingsModal,
  notifyMap,
  deleteNotifyMap,
  clearNotifyMap,
}) {
  const theme = useAppTheme();

  return (
    <RNP.Portal>
      <RNP.Modal
        visible={isSettingsModalVisible}
        onDismiss={toggleSettingsModal}
      >
        <View
          style={{
            backgroundColor: theme.colors.surface,
            height: "100%",
            padding: 10,
          }}
        >
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              paddingLeft: 5,
            }}
          >
            <RNP.Title>Settings</RNP.Title>
            <RNP.IconButton icon="close" onPress={toggleSettingsModal} />
          </View>
          <RNP.List.Section title="Notifications" style={{ flex: 1 }}>
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
                    descriptionStyle={{ opacity: 0.6 }}
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
            <View style={{ padding: 10, paddingBottom: 0 }}>
              <RNP.Button
                mode="outlined"
                icon="bell-off"
                onPress={clearNotifyMap}
                disabled={!notifyMap.size}
              >
                Turn off all notifications
              </RNP.Button>
            </View>
          </RNP.List.Section>
        </View>
      </RNP.Modal>
    </RNP.Portal>
  );
}
