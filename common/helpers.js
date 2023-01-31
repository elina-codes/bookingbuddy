import { blueGradient, greyGradient, redGradient } from "../common/theme";

/* THEME */
export const getTheme = (currentTheme) => {
  if (currentTheme === "default") {
    return greyGradient;
  } else if (currentTheme === "red") {
    return redGradient;
  } else if (currentTheme === "blue") {
    return blueGradient;
  }
};

/* DATES */

export const formattedDate = (date, long) => {
  if (long) {
    const options = { month: "short", day: "numeric", weekday: "short" };
    return date.toLocaleDateString("en-US", options);
  } else {
    const localized = date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/");
    return `${localized[2]}-${localized[0]}-${localized[1]}`;
  }
};

export const today = new Date();
export const tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
export const overmorrow = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

export const todayFormatted = formattedDate(today);
export const tomorrowFormatted = formattedDate(tomorrow);
export const overmorrowFormatted = formattedDate(overmorrow);

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

/* STRINGS */
