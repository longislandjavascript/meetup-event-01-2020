import { TimerDurationObject } from "./useTimer";
const secondsInMinutes = 60;
const secondsInHours = secondsInMinutes * 60;

export function convertTimeToObject(
  timerDuration: string | number
): TimerDurationObject {
  let durationAsNumber = +timerDuration;
  const hours = Math.floor(durationAsNumber / secondsInHours);
  durationAsNumber -= hours * secondsInHours;
  const minutes = Math.floor(durationAsNumber / secondsInMinutes);
  durationAsNumber -= minutes * secondsInMinutes;
  const seconds = durationAsNumber;

  return {
    hours: hours.toString().padStart(2, "0"),
    minutes: minutes.toString().padStart(2, "0"),
    seconds: seconds.toString().padStart(2, "0")
  };
}

function getValueOrZero(value: number | string | undefined) {
  if (!value) {
    return 0;
  } else {
    return +value;
  }
}

export function convertTimeToSeconds(timerDuration: TimerDurationObject) {
  const durationObject = timerDuration as TimerDurationObject;
  const hours = getValueOrZero(durationObject?.hours) * secondsInHours;
  const minutes = getValueOrZero(durationObject?.minutes) * secondsInMinutes;
  const seconds = getValueOrZero(durationObject?.seconds);

  return hours + minutes + seconds || 0;
}
