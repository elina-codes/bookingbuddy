import { normalizeAvailability } from "../helpers";

export function useAvailabilityDelta(notifyMap, newSchedule, spotsWanted) {
  const availableSpots = [];

  [...notifyMap.entries()].forEach((entry) => {
    const [id, { availability }] = entry;
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
