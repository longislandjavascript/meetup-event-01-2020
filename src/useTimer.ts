import * as React from "react";
import { convertTimeToObject, convertTimeToSeconds } from "./helpers";
const { useState, useEffect, useRef, useCallback } = React;

export type TimerDurationObjectProperty = string | number;

type TimerDurationSeconds = number;

export type TimerDurationObject = {
  hours?: TimerDurationObjectProperty;
  minutes?: TimerDurationObjectProperty;
  seconds?: TimerDurationObjectProperty;
};

export type TimerDuration = TimerDurationObject | TimerDurationSeconds;
export type TimerStatus = "NOT_STARTED" | "IN_PROGRESS" | "PAUSED";

export function useTimer(duration: TimerDuration) {
  const initialTimeRemaining =
    typeof duration === "number" ? duration : convertTimeToSeconds(duration);

  const [timeRemaining, setTimeRemaining] = useState<number>(
    initialTimeRemaining
  );

  const [status, setStatus] = useState<TimerStatus>("NOT_STARTED");

  const timeoutRef = useRef<number>(0);

  const handleClearInterval = useCallback(() => {
    clearInterval(timeoutRef.current);
    timeoutRef.current = 0;
  }, []);

  useEffect(() => {
    if (timeRemaining === 0) {
      handleClearInterval();
    }
  }, [timeRemaining, handleClearInterval]);

  useEffect(() => {
    if (status === "NOT_STARTED") {
      setTimeRemaining(initialTimeRemaining);
      handleClearInterval();
    } else if (status === "IN_PROGRESS") {
      timeoutRef.current = setInterval(() => {
        setTimeRemaining(t => t - 1);
      }, 1000);
    } else if (status === "PAUSED") {
      handleClearInterval();
    }
    return () => clearInterval(timeoutRef.current);
  }, [status, initialTimeRemaining, handleClearInterval]);

  const play = useCallback(() => {
    setStatus("IN_PROGRESS");
  }, []);

  const pause = useCallback(() => {
    setStatus("PAUSED");
  }, []);

  const reset = useCallback(() => {
    setStatus("NOT_STARTED");
  }, []);

  const timeObject = convertTimeToObject(timeRemaining);
  const timeLapsed = initialTimeRemaining - timeRemaining;

  return {
    time: timeObject,
    timeInSeconds: timeRemaining,
    play,
    pause,
    reset,
    status,
    timeLapsed
  };
}
