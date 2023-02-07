import { useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import * as RNP from "react-native-paper";
import { formattedDate, dateToDay } from "../common/helpers";
import { useAppTheme } from "../common/theme";
import { NotifyContext } from "../common/Context";

export default function SettingsNotificationsListItem({
  id,
  facility,
  spotsWanted,
  date,
  slot,
  navigation,
  closeModal,
}) {
  const { deleteNotifyMap } = useContext(NotifyContext);
  const theme = useAppTheme();

  return (
    <RNP.Card
      style={{
        margin: 5,
        marginLeft: 15,
        marginRight: 15,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: theme.colors.background,
      }}
    >
      <RNP.List.Item
        onPress={() => {
          closeModal();
          navigation.navigate("Schedule", {
            facility,
            tab: dateToDay(date),
          });
        }}
        style={{
          paddingRight: 10,
          paddingBottom: 0,
          paddingTop: 0,
        }}
        title={`${formattedDate(date)}  •  ${slot}`}
        description={`${spotsWanted} space${spotsWanted > 1 ? "s" : ""}`}
        descriptionStyle={{ opacity: 0.6 }}
        right={(props) => (
          <RNP.IconButton
            {...props}
            iconColor={theme.colors.primary}
            style={{ marginRight: 0 }}
            icon="bell"
            onPress={() => {
              deleteNotifyMap(id);
            }}
          />
        )}
      />
    </RNP.Card>
  );
}
