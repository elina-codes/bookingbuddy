import { useEffect, useMemo, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as RNP from "react-native-paper";
import axios from "axios";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./common/theme";
import * as Linking from "expo-linking";
import ScheduleTabs from "./components/ScheduleTabs";
import ScheduleList from "./components/ScheduleList";
import Header from "./components/Header";
import NotificationsSection from "./components/NotificationsSection";
import {
  formattedDate,
  isToday,
  isTomorrow,
  overmorrowFormatted,
  todayFormatted,
  tomorrowFormatted,
} from "./common/helpers";

import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

const expoPushToken = "ExponentPushToken[2khGbLLiXAT5dPG4YPuC-M]";

export default function Main() {
  const [isNotifyOn, setIsNotifyOn] = useState(false);
  const [isVisibleSnack, setIsVisibleSnack] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState([]);
  const [dateToShow, setDateToShow] = useState("today");
  const [spotsWanted, setSpotsWanted] = useState(1);
  const [scrapeInterval, setScrapeInterval] = useState(null);
  const [newAvailableSpots, setNewAvailableSpots] = useState([]);

  const theme = useAppTheme();

  const newSpotsMemo = useMemo(
    () => newAvailableSpots,
    [newAvailableSpots.length]
  );

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  async function sendPushNotification() {
    const body = newSpotsMemo
      .map((item) => {
        let day = item.date;
        if (isToday(item.date)) {
          day = "Today";
        }
        if (isTomorrow(item.date)) {
          day = "Tomorrow";
        }

        return `${day}: ${item.availability} from ${item.slot}`;
      })
      .join("\n");
    const message = {
      to: expoPushToken,
      sound: "default",
      title: `New Hive spaces available!`,
      body,
      data: { someData: "goes here" },
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

  async function registerForPushNotificationsAsync() {
    let token;
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
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  const toggleNotifications = () => {
    setIsNotifyOn(!isNotifyOn);
    setIsVisibleSnack(true);
  };

  const onDismissSnackBar = () => setIsVisibleSnack(false);

  const onTabChange = (day) => {
    setDateToShow(day);
    onDismissSnackBar();
  };

  function parseAvailability(str) {
    const regex =
      /<td class='offering-page-schedule-list-time-column'>\n(.*?) to\s+(.*?)\n<\/td>\n<td>\n<strong>Availability<\/strong><br>(.*?)\n<\/td>/g;
    let match;
    const availability = [];
    while ((match = regex.exec(str))) {
      availability.push({
        date: match[1] + "-" + match[2],
        availability: match[3],
      });
    }
    return availability;
  }

  useEffect(() => {
    if (newSpotsMemo.length && isNotifyOn) sendPushNotification();
  }, [newSpotsMemo]);

  useEffect(() => {
    if (scrapeInterval) {
      clearInterval(scrapeInterval);
      setScrapeInterval(null);
    }

    getSchedule(dateToShow);
    const interval = setInterval(() => {
      getSchedule(dateToShow);
      console.log("scraping", new Date().toLocaleTimeString());
    }, 30000);
    setScrapeInterval(interval);
    return () => clearInterval(interval);
  }, [dateToShow]);

  const checkAvailabilityChange = (oldSchedule, newSchedule) => {
    const availableSpots = [];
    newSchedule.forEach((newItem) => {
      const oldItem = oldSchedule.find(
        (oldItem) => oldItem.date === newItem.date
      );

      if (oldItem) {
        let oldAvail;
        if (oldItem.availability === "Full") {
          oldAvail = 0;
        } else if (oldItem.availability === "Available") {
          oldAvail = 100;
        } else if (oldItem.availability.includes(" ")) {
          oldAvail = parseInt(oldItem.availability[0]);
        }

        let newAvail;
        if (newItem.availability === "Full") {
          newAvail = 0;
        } else if (newItem.availability === "Available") {
          newAvail = 100;
        } else if (newItem.availability.includes(" ")) {
          newAvail = parseInt(newItem.availability[0]);
        }

        if (oldAvail !== newAvail && newAvail >= spotsWanted) {
          availableSpots.push(newItem);
        }
      }
    });

    setNewAvailableSpots(availableSpots);
  };

  const getSchedule = async (parseDate) => {
    let date = todayFormatted;
    if (parseDate === "tomorrow") {
      date = tomorrowFormatted;
    } else if (parseDate === "overmorrow") {
      date = overmorrowFormatted;
    }

    const options = {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
        Connection: "keep-alive",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://app.rockgympro.com",
        Referer:
          "https://app.rockgympro.com/b/widget/?a=offering&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c7488de2194&iframeid=&mode=p",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        "X-Requested-With": "XMLHttpRequest",
        "sec-ch-ua":
          '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
      },
      data: `PreventChromeAutocomplete=&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c74bfb31034&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&fctrl_2=course_guid&course_guid=13e877b67fb3b247cb7c18f2015b08a8a2271830&fctrl_3=limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd&limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-751460=pcount&ftagval_0_pcount-pid-1-751460=1&ftagname_1_pcount-pid-1-751460=pid&ftagval_1_pcount-pid-1-751460=751460&fctrl_5=pcount-pid-1-751460&pcount-pid-1-751460=0&ftagname_0_pcount-pid-1-1190943=pcount&ftagval_0_pcount-pid-1-1190943=1&ftagname_1_pcount-pid-1-1190943=pid&ftagval_1_pcount-pid-1-1190943=1190943&fctrl_6=pcount-pid-1-1190943&pcount-pid-1-1190943=0&ftagname_0_pcount-pid-1-4455667=pcount&ftagval_0_pcount-pid-1-4455667=1&ftagname_1_pcount-pid-1-4455667=pid&ftagval_1_pcount-pid-1-4455667=4455667&fctrl_7=pcount-pid-1-4455667&pcount-pid-1-4455667=0&ftagname_0_pcount-pid-1-4582326=pcount&ftagval_0_pcount-pid-1-4582326=1&ftagname_1_pcount-pid-1-4582326=pid&ftagval_1_pcount-pid-1-4582326=4582326&fctrl_8=pcount-pid-1-4582326&pcount-pid-1-4582326=0`,
    };

    try {
      const response = await axios(
        "https://app.rockgympro.com/b/widget/?a=equery",
        options
      );
      const resp = response.data.event_list_html;
      const resp_array = parseAvailability(resp);
      const result = resp_array.map((item) => {
        item.slot = item.date.split(",")[2].trim();
        item.date =
          item.date.split(",")[0].trim() +
          ", " +
          item.date.split(",")[1].trim();
        if (item.availability.search("Full") > 0) {
          item.availability = "Full";
        }
        return item;
      });
      checkAvailabilityChange(currentSchedule, result);
      setCurrentSchedule(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <Header />
        <View style={styles.container}>
          <View style={styles.flex}>
            <ScheduleTabs {...{ onTabChange, dateToShow }} />
          </View>
          <NotificationsSection
            {...{
              spotsWanted,
              setSpotsWanted,
              isNotifyOn,
              toggleNotifications,
            }}
          />
          <ScheduleList {...{ currentSchedule }} />
          <RNP.Snackbar
            visible={isVisibleSnack}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Undo",
              onPress: () => {
                setIsNotifyOn(!isNotifyOn);
                setIsVisibleSnack(false);
              },
            }}
          >
            <RNP.Text style={styles.light}>
              Notifications for {dateToShow} are {isNotifyOn ? "on" : "off"}
            </RNP.Text>
          </RNP.Snackbar>
          <StatusBar style="auto" />
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  flex: {
    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  light: {
    color: "#fff",
  },
  listHeader: {
    alignItems: "center",
  },
  noResults: {
    alignItems: "center",
    padding: 20,
  },
  notificationSection: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
});
