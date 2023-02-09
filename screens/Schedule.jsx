import { useContext, useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import ScheduleTabs from "../components/ScheduleTabs";
import ScheduleList from "../components/ScheduleList";
import ScheduleBookButton from "../components/ScheduleBookButton";
import { getSchedule } from "../common/helpers";

import { useInterval } from "../common/hooks/useInterval";
import { useAppTheme } from "../common/theme";
import { scheduleDays } from "../common/constants";
import { NotifyContext } from "../common/Context";

export default function Schedule({ route }) {
  const { deleteFacilityTabBadge, facilityTabBadges } =
    useContext(NotifyContext);
  const theme = useAppTheme();

  const { facility, tab = "today" } = route.params || {};

  const [dateToShow, setDateToShow] = useState(tab);
  const [currentScheduleToday, setCurrentScheduleToday] = useState([]);
  const [currentScheduleTomorrow, setCurrentScheduleTomorrow] = useState([]);
  const [currentScheduleOvermorrow, setCurrentScheduleOvermorrow] = useState(
    []
  );

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

  const { currentSchedule, setCurrentSchedule } = dayFuncMap[dateToShow];

  const checkTabBadges = (day) => {
    const facilityTabs = facilityTabBadges.get(facility);
    return !!facilityTabs?.has(day);
  };

  const onTabChange = (day) => {
    setDateToShow(day);
  };

  const getAllSchedules = async () => {
    for (let day of Object.values(scheduleDays)) {
      try {
        const daySchedule = await getSchedule(facility, day);
        setCurrentSchedule(daySchedule);
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
      <ScheduleBookButton {...{ facility }} />
      <ScheduleList {...{ currentSchedule }} />
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
