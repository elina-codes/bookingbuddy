export const formattedDate = (date) => {
  const localized = date
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  return `${localized[2]}-${localized[0]}-${localized[1]}`;
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
