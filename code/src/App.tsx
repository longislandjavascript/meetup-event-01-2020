import React from "react";
import styled from "styled-components";
import { useTimer } from "./useTimer";
import { Timer } from "./Timer";

const StyledApp = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export default function App() {
  const { time, play, pause, reset, status } = useTimer({
    hours: 1,
    minutes: 15,
    seconds: 30
  });
  return (
    <StyledApp>
      <Timer
        time={time}
        status={status}
        onPlay={play}
        onPause={pause}
        onReset={reset}
      />
    </StyledApp>
  );
}
