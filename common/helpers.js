import dayjs from "dayjs";
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

import axios from "axios";
import {
  tealGradient,
  redGradient,
  greenGradient,
  purpleGradient,
  goldGradient,
} from "../common/theme";
import { bookingLinks, facilities, themeColors } from "./constants";

/* THEME */
export const getThemeGradient = (currentTheme) => {
  switch (currentTheme) {
    case themeColors.teal:
      return tealGradient;
    case themeColors.green:
      return greenGradient;
    case themeColors.purple:
      return purpleGradient;
    case themeColors.gold:
      return goldGradient;
    default:
      return redGradient;
  }
};

/* DATES */

export const formattedDate = (date, long) => {
  const format = long ? "ddd, MMM D" : "YYYY-MM-DD";
  return dayjs(date).format(format);
};

export const today = new Date();
export const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
export const overmorrow = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

export const todayFormatted = formattedDate(today);
export const tomorrowFormatted = formattedDate(tomorrow);
export const overmorrowFormatted = formattedDate(overmorrow);
export const todayFormattedLong = formattedDate(today, true);
export const tomorrowFormattedLong = formattedDate(tomorrow, true);
export const overmorrowFormattedLong = formattedDate(overmorrow, true);

export const isToday = (date) => new Date(date).getDate() == today.getDate();
export const isTomorrow = (date) =>
  new Date(date).getDate() == tomorrow.getDate();
export const isOvermorrow = (date) =>
  new Date(date).getDate() == overmorrow.getDate();

export const isTodayTomorrowOvermorrow = (date) => {
  if (isToday(date)) {
    return "today";
  } else if (isTomorrow(date)) {
    return "tomorrow";
  } else if (isOvermorrow(date)) {
    return "overmorrow";
  } else {
    return formattedDate(date, true);
  }
};

/* ENDPOINTS */

export const getRequestData = (facility, date) => {
  switch (facility) {
    case facilities.hiveVancouver:
      return `PreventChromeAutocomplete=&widget_guid=2224a8b95d0e4ca7bf20012ec34b8f3e&random=63c74bfb31034&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=1c7052e4cd1c44469569ef7fea299ddd&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd&limited_to_course_guid_for_offering_guid_1c7052e4cd1c44469569ef7fea299ddd=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-751460=pcount&ftagval_0_pcount-pid-1-751460=1&ftagname_1_pcount-pid-1-751460=pid&ftagval_1_pcount-pid-1-751460=751460&fctrl_5=pcount-pid-1-751460&pcount-pid-1-751460=0&ftagname_0_pcount-pid-1-1190943=pcount&ftagval_0_pcount-pid-1-1190943=1&ftagname_1_pcount-pid-1-1190943=pid&ftagval_1_pcount-pid-1-1190943=1190943&fctrl_6=pcount-pid-1-1190943&pcount-pid-1-1190943=0&ftagname_0_pcount-pid-1-4455667=pcount&ftagval_0_pcount-pid-1-4455667=1&ftagname_1_pcount-pid-1-4455667=pid&ftagval_1_pcount-pid-1-4455667=4455667&fctrl_7=pcount-pid-1-4455667&pcount-pid-1-4455667=0&ftagname_0_pcount-pid-1-4582326=pcount&ftagval_0_pcount-pid-1-4582326=1&ftagname_1_pcount-pid-1-4582326=pid&ftagval_1_pcount-pid-1-4582326=4582326&fctrl_8=pcount-pid-1-4582326&pcount-pid-1-4582326=0`;
    case facilities.hiveHeights:
      return `PreventChromeAutocomplete=&widget_guid=91c5bcbedbe649dfb8cba1bae36c8d89&random=63d7523b94f94&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=c112d8a9eedd430bad088b8e3c48aa18&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18&limited_to_course_guid_for_offering_guid_c112d8a9eedd430bad088b8e3c48aa18=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-2525=pcount&ftagval_0_pcount-pid-1-2525=1&ftagname_1_pcount-pid-1-2525=pid&ftagval_1_pcount-pid-1-2525=2525&fctrl_5=pcount-pid-1-2525&pcount-pid-1-2525=0&ftagname_0_pcount-pid-1-2533=pcount&ftagval_0_pcount-pid-1-2533=1&ftagname_1_pcount-pid-1-2533=pid&ftagval_1_pcount-pid-1-2533=2533&fctrl_6=pcount-pid-1-2533&pcount-pid-1-2533=0&ftagname_0_pcount-pid-1-2529=pcount&ftagval_0_pcount-pid-1-2529=1&ftagname_1_pcount-pid-1-2529=pid&ftagval_1_pcount-pid-1-2529=2529&fctrl_7=pcount-pid-1-2529&pcount-pid-1-2529=0&ftagname_0_pcount-pid-1-38063=pcount&ftagval_0_pcount-pid-1-38063=1&ftagname_1_pcount-pid-1-38063=pid&ftagval_1_pcount-pid-1-38063=38063&fctrl_8=pcount-pid-1-38063&pcount-pid-1-38063=0&ftagname_0_pcount-pid-1-2586=pcount&ftagval_0_pcount-pid-1-2586=1&ftagname_1_pcount-pid-1-2586=pid&ftagval_1_pcount-pid-1-2586=2586&fctrl_9=pcount-pid-1-2586&pcount-pid-1-2586=0`;
    case facilities.hivePowerYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d867617cf81&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=271de7ba581c4aca9907bd0623f3f8c0&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_271de7ba581c4aca9907bd0623f3f8c0&limited_to_course_guid_for_offering_guid_271de7ba581c4aca9907bd0623f3f8c0=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveHathaYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86ed72fffb&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=ca875fd5f94f4050b15e22d0ebaa873e&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_ca875fd5f94f4050b15e22d0ebaa873e&limited_to_course_guid_for_offering_guid_ca875fd5f94f4050b15e22d0ebaa873e=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveYinYoga:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86e9431678&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=b9d92725eed440dc989df75227da2b72&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_b9d92725eed440dc989df75227da2b72&limited_to_course_guid_for_offering_guid_b9d92725eed440dc989df75227da2b72=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveYinMassage:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86e5017250&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=6000fdecca4d4d4bb455402553471a55&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_6000fdecca4d4d4bb455402553471a55&limited_to_course_guid_for_offering_guid_6000fdecca4d4d4bb455402553471a55=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveFuncMobility:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86defb44a6&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=0d5ae422203d4807ab65fa9fe4321afb&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_0d5ae422203d4807ab65fa9fe4321afb&limited_to_course_guid_for_offering_guid_0d5ae422203d4807ab65fa9fe4321afb=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hiveFit:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d86f299aff4&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=5504094c43384331b08a5db0656f1346&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_5504094c43384331b08a5db0656f1346&limited_to_course_guid_for_offering_guid_5504094c43384331b08a5db0656f1346=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    case facilities.hivePilates:
      return `PreventChromeAutocomplete=&widget_guid=b8424ec2fad54a829699e199b6b9abb0&random=63d870e27314e&iframeid=&mode=p&fctrl_1=offering_guid&offering_guid=3a473e8b25804a69abc1feeac25570a4&fctrl_2=course_guid&course_guid=&fctrl_3=limited_to_course_guid_for_offering_guid_3a473e8b25804a69abc1feeac25570a4&limited_to_course_guid_for_offering_guid_3a473e8b25804a69abc1feeac25570a4=&fctrl_4=show_date&show_date=${date}&ftagname_0_pcount-pid-1-1307=pcount&ftagval_0_pcount-pid-1-1307=1&ftagname_1_pcount-pid-1-1307=pid&ftagval_1_pcount-pid-1-1307=1307&fctrl_5=pcount-pid-1-1307&pcount-pid-1-1307=0&ftagname_0_pcount-pid-1-66734=pcount&ftagval_0_pcount-pid-1-66734=1&ftagname_1_pcount-pid-1-66734=pid&ftagval_1_pcount-pid-1-66734=66734&fctrl_6=pcount-pid-1-66734&pcount-pid-1-66734=0&ftagname_0_pcount-pid-1-66735=pcount&ftagval_0_pcount-pid-1-66735=1&ftagname_1_pcount-pid-1-66735=pid&ftagval_1_pcount-pid-1-66735=66735&fctrl_7=pcount-pid-1-66735&pcount-pid-1-66735=0&ftagname_0_pcount-pid-1-1969338=pcount&ftagval_0_pcount-pid-1-1969338=1&ftagname_1_pcount-pid-1-1969338=pid&ftagval_1_pcount-pid-1-1969338=1969338&fctrl_8=pcount-pid-1-1969338&pcount-pid-1-1969338=0`;
    default:
      return "";
  }
};

export const getRequestOptions = (facility, date) => ({
  method: "POST",
  headers: {
    Accept: "*/*",
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8",
    Connection: "keep-alive",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://app.rockgympro.com",
    Referer: bookingLinks[facility],
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
  data: getRequestData(facility, date),
});

export const formatResponse = (facility, response) => {
  const parseAvailability = (str) => {
    const regex =
      /<td class='offering-page-schedule-list-time-column'>\n(.*?) to\s+(.*?)\n<\/td>\n<td>\n<strong>Availability<\/strong><br>(.*?)\n<\/td>/g;
    let match;
    const availability = [];
    while ((match = regex.exec(str))) {
      match[2] = match[2].split("<")[0];
      availability.push({
        date: `${match[1]}-${match[2]}`,
        availability: match[3],
      });
    }
    return availability;
  };

  const resp = response.data.event_list_html;
  const resp_array = parseAvailability(resp);
  return resp_array.map((item) => {
    const splitItem = item.date.split(",");
    const dateString = `${splitItem[1].trim()}, ${new Date().getFullYear()}`;
    const itemDate = dayjs(dateString, "MMMM D, YYYY").toDate();
    const itemSlot = splitItem[2].trim();
    item.slot = itemSlot;
    item.date = itemDate;
    item.id = `${facility},${formattedDate(itemDate)},${itemSlot}`;
    if (item.availability.includes("Full")) {
      item.availability = "Full";
    }
    return item;
  });
};

export const normalizeAvailability = (item = {}) => {
  switch (item.availability) {
    case "Full":
      return 0;
    case "Available":
      return 100;
    default:
      return parseInt(item.availability?.[0]);
  }
};

export function getChangedAvailability(notifyMap, newSchedule) {
  const availableSpots = [];

  [...notifyMap].forEach((entry) => {
    const [id, { availability, spotsWanted }] = entry;
    const newItem = newSchedule.find((item) => item.id === id);

    if (newItem && availability !== newItem.availability) {
      const newAvail = normalizeAvailability(newItem);
      if (newAvail >= spotsWanted) {
        availableSpots.push(newItem);
      }
    }
  });

  return availableSpots;
}

export const getSchedule = async (facility, parseDate, notifyMap) => {
  let date = todayFormatted;
  if (parseDate === "tomorrow") {
    date = tomorrowFormatted;
  } else if (parseDate === "overmorrow") {
    date = overmorrowFormatted;
  }

  const options = getRequestOptions(facility, date);

  try {
    const response = await axios(
      "https://app.rockgympro.com/b/widget/?a=equery",
      options
    );
    const result = formatResponse(facility, response);
    return notifyMap ? getChangedAvailability(notifyMap, result) : result;
  } catch (error) {
    console.error(error);
  }
};
