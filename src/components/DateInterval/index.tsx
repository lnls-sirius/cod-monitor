import React from "react";
import { useSelector } from "react-redux";
import TimeInput from "../TimeInput";
import * as S from './styled';

const DateInterval: React.FC = () => {
  const bpmList = useSelector((state: any) => state.bpm.listBpm);
  return(
    <S.TextWrapper>
      From
        <TimeInput
          action='Start Time'/>
      to
        <TimeInput
          action='End Time'/>
          {bpmList}
    </S.TextWrapper>
  );
};

export default DateInterval;
