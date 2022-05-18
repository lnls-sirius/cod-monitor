import React from "react";
import TimeInput from "../TimeInput";
import * as S from './styled';

const DateInterval: React.FC = () => {
  return(
    <S.TextWrapper>
      From
        <TimeInput
          action='Start Time'/>
      to
        <TimeInput
          action='End Time'/>
      Reference:
        <TimeInput
          action='Ref Time'/>
    </S.TextWrapper>
  );
};

export default DateInterval;
