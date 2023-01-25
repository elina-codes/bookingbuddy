import * as RNP from "react-native-paper";

export default function ScheduleTabs({ onTabChange, dateToShow }) {
  const getOvermorrowDate = () => {
    var today = new Date();
    var overmorrow = new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000);
    var options = { month: "short", day: "numeric" };
    return overmorrow.toLocaleDateString("en-US", options);
  };

  return (
    <RNP.SegmentedButtons
      value={dateToShow}
      onValueChange={onTabChange}
      buttons={[
        {
          label: "Today",
          value: "today",
        },
        {
          label: "Tomorrow",
          value: "tomorrow",
        },
        {
          label: getOvermorrowDate(),
          value: "overmorrow",
        },
      ]}
    />
  );
}
