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
} from "./common/helpers";
import { Platform, View } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useInterval } from "./common/hooks/useInterval";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

function ThemeButton() {
  const { setCurrentTheme } = useContext(ThemeContext);
  const theme = useAppTheme();
  const updateTheme = () => {
    setCurrentTheme((prev) => (prev === "default" ? "blue" : "default"));
  };

  return (
    <RNP.Appbar.Action
      icon="palette"
      color={theme.colors.inverseSurface}
      onPress={updateTheme}
    />
  );
}

export default function Main() {
  const theme = useAppTheme();
  const [expoPushToken, setExpoPushToken] = useState("");

  const { notifyMap, clearNotifyMap, updateNotifyMap, addFacilityTabBadge } =
    useContext(NotifyContext);
  const navigation = useNavigation();

  // const storeTheme = async (value) => {
  //   try {
  //     await AsyncStorage.setItem("theme", value);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   storeTheme(currentTheme);
  // }, [currentTheme]);

  // useEffect(() => {
  //   const getThemeGradient = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("theme");
  //       if (value !== null) {
  //         setCurrentTheme(value);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //     }
  //   };
  //   getThemeGradient();
  // }, []);

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
        title: `New spaces available for ${facility}! 🎉`,
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
      console.log("PARSING AT APP LEVEL", [...notifyMap.entries()]);
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

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Stack.Navigator
        screenOptions={{
          headerBackground: (props) => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Select a schedule",
            headerRight: () => (
              <>
                <RNP.Appbar.Action
                  icon="bell-off"
                  color={theme.colors.inverseSurface}
                  onPress={() => {
                    clearNotifyMap();
                  }}
                />
                <ThemeButton />
              </>
            ),
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
    </View>
  );
}
