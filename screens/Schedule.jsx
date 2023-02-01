import { useContext, useEffect, useMemo, useState } from "react";
import * as RNP from "react-native-paper";
import { View } from "react-native";
import ScheduleTabs from "../components/ScheduleTabs";
import ScheduleList from "../components/ScheduleList";
import NotificationsSection from "../components/NotificationsSection";
import { getSchedule } from "../common/helpers";

import * as Linking from "expo-linking";
import { useInterval } from "../common/hooks/useInterval";
import { useAppTheme } from "../common/theme";
import { bookingLinks, scheduleDays } from "../common/constants";
import { NotifyContext } from "../common/Context";

export default function Schedule({ route, navigation }) {
  const theme = useAppTheme();
  const { facility, tab = "today", badges } = route.params || {};

  const { deleteFacilityTabBadge, facilityTabBadges } =
    useContext(NotifyContext);

  const onWebsitePress = () => {
    Linking.openURL(bookingLinks[facility]);
  };
  useEffect(() => {
    navigation.setOptions({
      title: facility,
      headerRight: () => (
        <RNP.Appbar.Action
          icon="open-in-new"
          color={theme.colors.inverseSurface}
          onPress={onWebsitePress}
        />
      ),
    });
  }, [navigation]);

  const [dateToShow, setDateToShow] = useState(tab);

  const [currentScheduleToday, setCurrentScheduleToday] = useState([]);
  const [currentScheduleTomorrow, setCurrentScheduleTomorrow] = useState([]);
  const [currentScheduleOvermorrow, setCurrentScheduleOvermorrow] = useState(
    []
  );
  const [spotsWantedToday, setSpotsWantedToday] = useState(1);
  const [spotsWantedTomorrow, setSpotsWantedTomorrow] = useState(1);
  const [spotsWantedOvermorrow, setSpotsWantedOvermorrow] = useState(1);

  const checkTabBadges = (day) => {
    const facilityTabs = facilityTabBadges.get(facility);
    return !!facilityTabs?.has(day);
  };

  const currentScheduleTodayMemo = useMemo(
    () => currentScheduleToday,
    [currentScheduleToday]
  );
  const currentScheduleTomorrowMemo = useMemo(
    () => currentScheduleTomorrow,
    [currentScheduleTomorrow]
  );
  const currentScheduleOvermorrowMemo = useMemo(
    () => currentScheduleOvermorrow,
    [currentScheduleOvermorrow]
  );

  const dayFuncMap = new Map([
    [
      "today",
      {
        spotsWanted: spotsWantedToday,
        setSpotsWanted: setSpotsWantedToday,
        currentSchedule: currentScheduleTodayMemo,
        setCurrentSchedule: setCurrentScheduleToday,
      },
    ],
    [
      "tomorrow",
      {
        spotsWanted: spotsWantedTomorrow,
        setSpotsWanted: setSpotsWantedTomorrow,
        currentSchedule: currentScheduleTomorrowMemo,
        setCurrentSchedule: setCurrentScheduleTomorrow,
      },
    ],
    [
      "overmorrow",
      {
        spotsWanted: spotsWantedOvermorrow,
        setSpotsWanted: setSpotsWantedOvermorrow,
        currentSchedule: currentScheduleOvermorrowMemo,
        setCurrentSchedule: setCurrentScheduleOvermorrow,
      },
    ],
  ]);

  const getAllSchedules = async () => {
    for (let day of scheduleDays) {
      try {
        const daySchedule = await getSchedule(facility, day);
        dayFuncMap.get(day).setCurrentSchedule(daySchedule);
      } catch (e) {
        console.error(e);
      }
    }
  };

  useInterval(getAllSchedules, 20000);

  useEffect(() => {
    getAllSchedules();
    console.log({ tab, facility });
  }, []);

  useEffect(() => {
    deleteFacilityTabBadge(facility, dateToShow);
  }, [dateToShow]);

  const onTabChange = (day) => {
    setDateToShow(day);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <NotificationsSection
        {...{
          spotsWanted: dayFuncMap.get(dateToShow).spotsWanted,
          setSpotsWanted: dayFuncMap.get(dateToShow).setSpotsWanted,
        }}
      />
      <ScheduleList
        {...{
          currentSchedule: dayFuncMap.get(dateToShow).currentSchedule,
          spotsWanted: dayFuncMap.get(dateToShow).spotsWanted,
        }}
      />
      <View>
        <ScheduleTabs
          {...{
            onTabChange,
            dateToShow,
            showTodayBadge: checkTabBadges("today"),
            showTomorrowBadge: checkTabBadges("tomorrow"),
            showOvermorrowBadge: checkTabBadges("overmorrow"),
          }}
        />
      </View>
    </View>
  );
}
