import React from "react";
import { useSelector } from "react-redux";
import * as S from './styled';

const DateInterval: React.FC = () => {
  const startDate = new Date(useSelector((state: any) => state.time.start_date));
  const endDate = new Date(useSelector((state: any) => state.time.end_date));

  return(
    <S.TextWrapper>
      From {startDate.toLocaleString()} to {endDate.toLocaleString()}
      {/* From
        <TimeInput
          action='Start Time'/>
      to
        <TimeInput
          action='End Time'/> */}
    </S.TextWrapper>
  );
};

export default DateInterval;
