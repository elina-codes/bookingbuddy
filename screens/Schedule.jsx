import { useContext, useEffect, useMemo, useState } from "react";
import * as RNP from "react-native-paper";
import { View } from "react-native";
import ScheduleTabs from "../components/ScheduleTabs";
import ScheduleList from "../components/ScheduleList";
import ScheduleHeadings from "../components/ScheduleHeadings";
import { getFacilityTitleAndLocation, getSchedule } from "../common/helpers";

import * as Linking from "expo-linking";
import { useInterval } from "../common/hooks/useInterval";
import { useAppTheme } from "../common/theme";
import { facilities, scheduleDays } from "../common/constants";
import { NotifyContext } from "../common/Context";

export default function Schedule({ route, navigation }) {
  const theme = useAppTheme();
  const { facility, tab = "today", badges } = route.params || {};

  const { deleteFacilityTabBadge, facilityTabBadges } =
    useContext(NotifyContext);

  const onWebsitePress = () => {
    Linking.openURL(facilities[facility].bookingLink);
  };

  useEffect(() => {
    navigation.setOptions({
      title: getFacilityTitleAndLocation(facility),
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
      scheduleDays.today,
      {
        currentSchedule: currentScheduleTodayMemo,
        setCurrentSchedule: setCurrentScheduleToday,
      },
    ],
    [
      scheduleDays.tomorrow,
      {
        currentSchedule: currentScheduleTomorrowMemo,
        setCurrentSchedule: setCurrentScheduleTomorrow,
      },
    ],
    [
      scheduleDays.overmorrow,
      {
        currentSchedule: currentScheduleOvermorrowMemo,
        setCurrentSchedule: setCurrentScheduleOvermorrow,
      },
    ],
  ]);

  const getAllSchedules = async () => {
    for (let day of Object.values(scheduleDays)) {
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
      <ScheduleHeadings />
      <ScheduleList
        {...{
          currentSchedule: dayFuncMap.get(dateToShow).currentSchedule,
        }}
      />
      <View>
        <ScheduleTabs
          {...{
            onTabChange,
            dateToShow,
            showTodayBadge: checkTabBadges(scheduleDays.today),
            showTomorrowBadge: checkTabBadges(scheduleDays.tomorrow),
            showOvermorrowBadge: checkTabBadges(scheduleDays.overmorrow),
          }}
        />
      </View>
    </View>
  );
}
