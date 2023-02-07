import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext, NotifyContext } from "./common/Context";
import * as RNP from "react-native-paper";
import { useAppTheme } from "./common/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScheduleScreen from "./screens/Schedule";
import HomeScreen from "./screens/Home";
import Header from "./components/Header";
import {
  isOvermorrow,
  isToday,
  dateToDay,
  isTomorrow,
  getSchedule,
  getFacilityTitleAndLocation,
} from "./common/helpers";
import { Platform, View } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useInterval } from "./common/hooks/useInterval";
import { useNavigation } from "@react-navigation/native";
import { facilities, scheduleDays } from "./common/constants";

// Run local notifications in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const Stack = createNativeStackNavigator();

export default function Main() {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const { notifyMap, updateNotifyMap, addFacilityTabBadge, addNewSpaceAlert } =
    useContext(NotifyContext);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        const { tab, facility } = notification?.request?.content?.data || {};
        if (facility && tab) {
          addFacilityTabBadge(facility, tab);
        }
      }
    );

    const receivedSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { tab, facility } =
          response?.notification?.request?.content?.data || {};
        navigation.navigate("Schedule", { facility, tab });
      });
    return () => {
      receivedSubscription.remove();
      subscription.remove();
    };
  }, []);

  const sendLocalNotification = async (spaces = []) => {
    if (spaces.length) {
      console.log("Sending local notification...", spaces);
      const body = spaces
        .map((item = {}) => {
          let { id, date, availability, slot } = item || {};
          const current = notifyMap.get(id);
          addNewSpaceAlert(id);
          console.log({ id, current });
          updateNotifyMap({ id, ...current, availability });
          if (isToday(date)) {
            date = "Today";
          } else if (isTomorrow(date)) {
            date = "Tomorrow";
          } else if (isOvermorrow(date)) {
            date = date.toLocaleDateString("en-US", { weekday: "long" });
          } else {
            date = "";
          }
          return `${date}: ${availability} from ${slot}`;
        })
        .join("\n");
      const { facility } = spaces?.[0] || {};

      const content = {
        title: `New availability for ${getFacilityTitleAndLocation(
          facility
        )}! 🎉`,
        body,
        data: {
          facility,
          tab: spaces.length
            ? dateToDay(spaces?.[0]?.date)
            : scheduleDays.today,
        },
      };
      try {
        await Notifications.scheduleNotificationAsync({
          content,
          trigger: null,
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkForNewAvailability = useCallback(() => {
    if (notifyMap.size) {
      const facilityDateSet = new Set();
      [...notifyMap.values()].forEach((item) => {
        const { facility, date } = item;
        facilityDateSet.add(`${facility},${date}`);
      });
      [...facilityDateSet].forEach(async (pair) => {
        const [facility, date] = pair.split(",");
        const parseDate = dateToDay(date);
        if (parseDate) {
          const newSpaces = await getSchedule(facility, parseDate, notifyMap);
          if (newSpaces.length) {
            sendLocalNotification(newSpaces);
          }
        }
      });
    }
  }, [notifyMap]);

  useEffect(() => {
    checkForNewAvailability();
  }, [notifyMap]);

  useInterval(checkForNewAvailability, 20000);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right",
          headerBackTitleVisible: false,
          headerTintColor: theme.colors.inverseSurface,
          headerBackground: (props) => (
            <Header
              {...{ showSettingsModal, setShowSettingsModal, ...props }}
            />
          ),
          headerRight: () => (
            <>
              <RNP.Appbar.Action
                icon="cog"
                color={theme.colors.inverseSurface}
                onPress={() => setShowSettingsModal(true)}
              />
            </>
          ),
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Select a schedule",
          }}
        />
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
      </Stack.Navigator>
    </View>
  );
}
