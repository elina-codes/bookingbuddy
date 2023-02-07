import { useContext, useEffect, useMemo, useState } from "react";
import * as RNP from "react-native-paper";
import { View } from "react-native";
import ScheduleTabs from "../components/ScheduleTabs";
import ScheduleList from "../components/ScheduleList";
import ScheduleHeadings from "../components/ScheduleHeadings";
import { getFacilityTitleAndLocation, getSchedule } from "../common/helpers";

import { useInterval } from "../common/hooks/useInterval";
import { useAppTheme } from "../common/theme";
import { scheduleDays } from "../common/constants";
import { NotifyContext, ThemeContext } from "../common/Context";

export default function Schedule({ route }) {
  const { deleteFacilityTabBadge, facilityTabBadges } =
    useContext(NotifyContext);
  const { currentTheme } = useContext(ThemeContext);
  const theme = useAppTheme(currentTheme);

  const { facility, tab = "today", badges } = route.params || {};

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

  const dayFuncMap = {
    [scheduleDays.today]: {
      currentSchedule: currentScheduleTodayMemo,
      setCurrentSchedule: setCurrentScheduleToday,
    },
    [scheduleDays.tomorrow]: {
      currentSchedule: currentScheduleTomorrowMemo,
      setCurrentSchedule: setCurrentScheduleTomorrow,
    },
    [scheduleDays.overmorrow]: {
      currentSchedule: currentScheduleOvermorrowMemo,
      setCurrentSchedule: setCurrentScheduleOvermorrow,
    },
  };

  const onTabChange = (day) => {
    setDateToShow(day);
  };

  const getAllSchedules = async () => {
    for (let day of Object.values(scheduleDays)) {
      try {
        const daySchedule = await getSchedule(facility, day);
        dayFuncMap[day].setCurrentSchedule(daySchedule);
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

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <ScheduleHeadings {...{ facility }} />
      <ScheduleList
        {...{
          currentSchedule: dayFuncMap[dateToShow].currentSchedule,
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
