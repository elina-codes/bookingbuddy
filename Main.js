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
  isTodayTomorrowOvermorrow,
  isTomorrow,
  getSchedule,
  formattedDate,
} from "./common/helpers";
import { Platform, ScrollView, View } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useInterval } from "./common/hooks/useInterval";
import { useNavigation } from "@react-navigation/native";
import Settings from "./screens/Settings";

const Stack = createNativeStackNavigator();

export default function Main() {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const {
    notifyMap,
    clearNotifyMap,
    deleteNotifyMap,
    updateNotifyMap,
    addFacilityTabBadge,
  } = useContext(NotifyContext);
  const { setCurrentTheme } = useContext(ThemeContext);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [isSettingsModalVisible, setIsSettingsModalVisible] = useState(false);

  const updateTheme = (color = "default") => {
    setCurrentTheme(color);
  };

  const registerForPushNotificationsAsync = async () => {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

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

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  const sendPushNotification = async (spaces = []) => {
    if (spaces.length) {
      console.log("Sending push notification...", spaces);
      const body = spaces
        .map((item = {}) => {
          let { id, date, availability, slot } = item || {};
          const current = notifyMap.get(id);
          updateNotifyMap(id, { ...current, availability });
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
      const [facility] = spaces?.[0].id?.split(",");

      const message = {
        to: expoPushToken,
        sound: "default",
        title: `New availability for ${facility}! 🎉`,
        body,
        data: {
          facility,
          tab: spaces.length
            ? isTodayTomorrowOvermorrow(spaces?.[0]?.date)
            : "today",
        },
      };

      try {
        await fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-encoding": "gzip, deflate",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(message),
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const checkForNewAvailability = useCallback(() => {
    if (notifyMap.size) {
      const facilityDateSet = new Set();
      [...notifyMap.keys()].forEach((id) => {
        const [facility, date] = id.split(",");
        facilityDateSet.add(`${facility},${date}`);
      });
      [...facilityDateSet].forEach(async (pair) => {
        const [facility, date] = pair.split(",");
        let parseDate = "";
        if (isToday(date)) {
          parseDate = "today";
        } else if (isTomorrow(date)) {
          parseDate = "tomorrow";
        } else if (isOvermorrow(date)) {
          parseDate = "overmorrow";
        }
        if (parseDate) {
          const newSpaces = await getSchedule(facility, parseDate, notifyMap);
          if (newSpaces.length) {
            sendPushNotification(newSpaces);
          }
        }
      });
    }
  }, [notifyMap]);

  useEffect(() => {
    checkForNewAvailability();
  }, [notifyMap]);

  useInterval(checkForNewAvailability, 20000);

  const toggleSettingsModal = () => {
    setIsSettingsModalVisible(!isSettingsModalVisible);
  };

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerBackground: (props) => <Header {...props} />,
          headerRight: () => (
            <>
              <RNP.Appbar.Action
                icon="cog"
                color={theme.colors.inverseSurface}
                onPress={toggleSettingsModal}
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
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
          options={({ route }) => ({
            title: route.params.facility,
          })}
        />
      </Stack.Navigator>
      <Settings
        {...{
          isSettingsModalVisible,
          toggleSettingsModal,
          notifyMap,
          deleteNotifyMap,
          clearNotifyMap,
          updateTheme,
        }}
      />
    </View>
  );
}
