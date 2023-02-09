import { useCallback, useContext, useEffect, useState } from "react";
import { NotifyContext } from "./common/Context";
import * as RNP from "react-native-paper";
import { useAppTheme } from "./common/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotificationsScreen from "./screens/Notifications";
import SettingsScreen from "./screens/Settings";
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
  dateFromNow,
} from "./common/helpers";
import { View } from "react-native";
import * as Notifications from "expo-notifications";
import { useInterval } from "./common/hooks/useInterval";
import { useNavigation } from "@react-navigation/native";
import { scheduleDays } from "./common/constants";
import { Provider as PaperProvider } from "react-native-paper";

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
  const { notifyMap, updateNotifyMap, addFacilityTabBadge, addNewSpaceAlert } =
    useContext(NotifyContext);
  const theme = useAppTheme();
  const navigation = useNavigation();

  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

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

  // Update the notifyMap with the latest availability to prevent duplicate notifications
  const handleNewNotification = (item = {}) => {
    let { id, availability } = item;
    const current = notifyMap.get(id);
    updateNotifyMap({ id, ...current, availability });
    addNewSpaceAlert(id);
  };

  const sendLocalNotification = async (spaces = []) => {
    if (spaces.length) {
      const body = spaces
        .map((item = {}) => {
          handleNewNotification(item);
          const { date, availability, slot } = item || {};
          const itemDate = dateFromNow(date);
          return `${itemDate}: ${availability} from ${slot}`;
        })
        .join("\n");

      // Group notifications by facility
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
            // Filter out spaces that have already been notified to
            // prevent multiple notifications for the same space
            // when availability changes but fits constraints
            const spacesNotYetNotified = newSpaces.filter(
              (item) => !newSpaceAlerts.has(item.id)
            );
            sendLocalNotification(spacesNotYetNotified);
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
    <PaperProvider theme={theme}>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Stack.Navigator
          screenOptions={{
            animation: "slide_from_right",
            headerBackTitleVisible: false,
            headerTintColor: theme.colors.inverseSurface,
            headerBackground: (props) => (
              <Header
                {...{
                  showSettingsModal,
                  setShowSettingsModal,
                  showNotificationsModal,
                  setShowNotificationsModal,
                  ...props,
                }}
              />
            ),
            headerRight: () => (
              <>
                <RNP.Appbar.Action
                  icon="bell-outline"
                  color={theme.colors.inverseSurface}
                  onPress={() =>
                    navigation.navigate("Notifications", { params: notifyMap })
                  }
                />
                <RNP.Appbar.Action
                  icon="cog-outline"
                  color={theme.colors.inverseSurface}
                  onPress={() =>
                    navigation.navigate("Settings", { params: notifyMap })
                  }
                />
              </>
            ),
          }}
        >
          <Stack.Group>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Select a schedule",
              }}
            />
            <Stack.Screen
              name="Schedule"
              component={ScheduleScreen}
              options={({ route }) => ({
                title: getFacilityTitleAndLocation(route.params.facility),
              })}
            />
          </Stack.Group>
          <Stack.Group
            screenOptions={{
              presentation: "fullScreenModal",
              animation: "fade",
            }}
          >
            <Stack.Screen
              name="Notifications"
              component={NotificationsScreen}
            />
            <Stack.Screen name="Settings" component={SettingsScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </View>
    </PaperProvider>
  );
}
