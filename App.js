import * as RNP from "react-native-paper";
import { useEffect, useMemo, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as PaperProvider } from "react-native-paper";
import { useAppTheme } from "./common/theme";
import ScheduleTabs from "./components/ScheduleTabs";
import ScheduleList from "./components/ScheduleList";
import Header from "./components/Header";
import NotificationsSection from "./components/NotificationsSection";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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
import { useInterval } from "./common/hooks/useInterval";

export default function Main() {
  const theme = useAppTheme();
  const [currentTheme, setCurrentTheme] = useState("default");
  const [dateToShow, setDateToShow] = useState("today");
  const [notifySlots, setNotifySlots] = useState(new Map([]));

  const [isNotifyAllTodayOn, setIsNotifyAllTodayOn] = useState(false);
  const [isNotifyAllTomorrowOn, setIsNotifyAllTomorrowOn] = useState(false);
  const [isNotifyAllOvermorrowOn, setIsNotifyAllOvermorrowOn] = useState(false);

  const [currentScheduleToday, setCurrentScheduleToday] = useState([]);
  const [currentScheduleTomorrow, setCurrentScheduleTomorrow] = useState([]);
  const [currentScheduleOvermorrow, setCurrentScheduleOvermorrow] = useState(
    []
  );
  const [spotsWantedToday, setSpotsWantedToday] = useState(1);
  const [spotsWantedTomorrow, setSpotsWantedTomorrow] = useState(1);
  const [spotsWantedOvermorrow, setSpotsWantedOvermorrow] = useState(1);

  const [newSpacesToday, setNewSpacesToday] = useState([]);
  const [newSpacesTomorrow, setNewSpacesTomorrow] = useState([]);
  const [newSpacesOvermorrow, setNewSpacesOvermorrow] = useState([]);

  const [expoPushToken, setExpoPushToken] = useState("");

  const dayFuncMap = new Map([
    [
      "today",
      {
        spotsWanted: spotsWantedToday,
        newSpaces: newSpacesToday,
        currentSchedule: currentScheduleToday,
        notifyAllDay: isNotifyAllTodayOn,
        setSpotsWanted: setSpotsWantedToday,
        setNewSpaces: setNewSpacesToday,
        setCurrentSchedule: setCurrentScheduleToday,
        setNotifyAllDay: setIsNotifyAllTodayOn,
      },
    ],
    [
      "tomorrow",
      {
        spotsWanted: spotsWantedTomorrow,
        newSpaces: newSpacesTomorrow,
        currentSchedule: currentScheduleTomorrow,
        notifyAllDay: isNotifyAllTomorrowOn,
        setSpotsWanted: setSpotsWantedTomorrow,
        setNewSpaces: setNewSpacesTomorrow,
        setCurrentSchedule: setCurrentScheduleTomorrow,
        setNotifyAllDay: setIsNotifyAllTomorrowOn,
      },
    ],
    [
      "overmorrow",
      {
        spotsWanted: spotsWantedOvermorrow,
        newSpaces: newSpacesOvermorrow,
        currentSchedule: currentScheduleOvermorrow,
        notifyAllDay: isNotifyAllOvermorrowOn,
        setSpotsWanted: setSpotsWantedOvermorrow,
        setNewSpaces: setNewSpacesOvermorrow,
        setCurrentSchedule: setCurrentScheduleOvermorrow,
        setNotifyAllDay: setIsNotifyAllOvermorrowOn,
      },
    ],
  ]);

  const currentTab = dayFuncMap.get(dateToShow);

  const updateTheme = () => {
    setCurrentTheme((prev) => (prev === "default" ? "blue" : "default"));
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
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });

  // Can use this function below OR use Expo's Push Notification Tool from: https://expo.dev/notifications
  const sendPushNotification = async (spacesDay) => {
    if (spacesDay.length) {
      console.log("Sending push notification...", spacesDay);
      const body = spacesDay
        .map((item) => {
          let { date, availability, slot } = item;
          if (isToday(date)) {
            date = "Today";
          }
          if (isTomorrow(date)) {
            date = "Tomorrow";
          }

          return `${date}: ${availability} from ${slot}`;
        })
        .join("\n");

      const message = {
        to: expoPushToken,
        sound: "default",
        title: `New Hive spaces available! 🎉`,
        body,
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

  const updateNotifySlots = (id, notify) => {
    setNotifySlots((prev) => {
      const newMap = new Map(prev);
      newMap.set(id, notify);
      return newMap;
    });
  };

  const newSpacesTodayMemo = useMemo(() => newSpacesToday, [newSpacesToday]);
  const newSpacesTomorrowMemo = useMemo(
    () => newSpacesTomorrow,
    [newSpacesTomorrow]
  );
  const newSpacesOvermorrowMemo = useMemo(
    () => newSpacesOvermorrow,
    [newSpacesOvermorrow]
  );

  function parseAvailability(str) {
    const regex =
      /<td class='offering-page-schedule-list-time-column'>\n(.*?) to\s+(.*?)\n<\/td>\n<td>\n<strong>Availability<\/strong><br>(.*?)\n<\/td>/g;
    let match;
    const availability = [];
    while ((match = regex.exec(str))) {
      availability.push({
        date: `${match[1]}-${match[2]}`,
        availability: match[3],
      });
    }
    return availability;
  }

  const toggleNotifications = () => {
    const setNotifyAll = currentTab.setNotifyAllDay;
    setNotifyAll(!currentTab.notifyAllDay);
  };

  useEffect(() => {
    if (newSpacesTodayMemo.length && notifySlots.size)
      sendPushNotification(newSpacesTodayMemo);
  }, [newSpacesTodayMemo]);

  useEffect(() => {
    if (newSpacesTomorrowMemo.length && notifySlots.size)
      sendPushNotification(newSpacesTomorrowMemo);
  }, [newSpacesTomorrowMemo]);

  useEffect(() => {
    if (newSpacesOvermorrowMemo.length && notifySlots.size)
      sendPushNotification(newSpacesOvermorrowMemo);
  }, [newSpacesOvermorrowMemo]);

  const getAllSchedules = () => {
    getSchedule("today");
    getSchedule("tomorrow");
    getSchedule("overmorrow");
  };

  useInterval(getAllSchedules, 20000);

  useEffect(() => {
    getAllSchedules();
  }, []);

  const checkAvailabilityChange = (oldSchedule, newSchedule, spotsWanted) => {
    const availableSpots = [];

    newSchedule.forEach((newItem) => {
      const oldItem = oldSchedule.find(
        (oldItem) =>
          oldItem.id === newItem.id &&
          oldItem.availability !== newItem.availability
      );

      const normalizeAvailability = (item) => {
        switch (item.availability) {
          case "Full":
            return 0;
          case "Available":
            return 100;
          default:
            return parseInt(item.availability[0]);
        }
      };

      if (oldItem) {
        const newAvail = normalizeAvailability(newItem);

        if (newAvail >= spotsWanted) {
          availableSpots.push(newItem);
        }
      }
    });

    return availableSpots;
  };

  const notifyNewSpaces = (newSpaces, newSpaceSetter) => {
    const newSpacesArray = [];
    for (let newSpace of newSpaces) {
      const notifySlot = notifySlots.get(newSpace.id);
      if (notifySlot) {
        newSpacesArray.push(newSpace);
      }
    }
    newSpaceSetter(newSpacesArray);
  };

  const getSchedule = async (parseDate) => {
    let date = todayFormatted;
    let currentSchedule = currentScheduleToday;
    let currentScheduleSetter = setCurrentScheduleToday;
    let newSpaceSetter = setNewSpacesToday;
    let spotsWanted = spotsWantedToday;

    if (parseDate === "tomorrow") {
      date = tomorrowFormatted;
      currentSchedule = currentScheduleTomorrow;
      currentScheduleSetter = setCurrentScheduleTomorrow;
      newSpaceSetter = setNewSpacesTomorrow;
      spotsWanted = spotsWantedTomorrow;
    } else if (parseDate === "overmorrow") {
      date = overmorrowFormatted;
      currentSchedule = currentScheduleOvermorrow;
      currentScheduleSetter = setCurrentScheduleOvermorrow;
      newSpaceSetter = setNewSpacesOvermorrow;
      spotsWanted = spotsWantedOvermorrow;
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
        const splitItem = item.date.split(",");
        const itemDate = new Date(
          `${splitItem[1].trim()},${new Date().getFullYear()}`
        );
        const itemSlot = splitItem[2].trim();
        item.slot = itemSlot;
        item.date = itemDate;
        item.id = `${formattedDate(itemDate)},${itemSlot}`;
        if (item.availability.includes("Full")) {
          item.availability = "Full";
        }
        return item;
      });
      const newSpaces = checkAvailabilityChange(
        currentSchedule,
        result,
        spotsWanted
      );
      notifyNewSpaces(newSpaces, newSpaceSetter);
      currentScheduleSetter(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onTabChange = (day) => {
    setDateToShow(day);
  };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <Header {...{ currentTheme, updateTheme }} />
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.background,
          }}
        >
          <NotificationsSection
            {...{
              spotsWanted: currentTab.spotsWanted,
              setSpotsWanted: currentTab.setSpotsWanted,
              isNotifyAllOn: currentTab.notifyAllDay,
              toggleNotifications,
            }}
          />
          <ScheduleList
            {...{
              isNotifyAllOn: currentTab.notifyAllDay,
              currentSchedule: currentTab.currentSchedule,
              notifySlots,
              updateNotifySlots,
            }}
          />
          <View>
            <ScheduleTabs {...{ onTabChange, dateToShow, currentTheme }} />
          </View>
        </View>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
