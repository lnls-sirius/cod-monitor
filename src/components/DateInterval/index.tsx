import React from "react";
import { TimeDispatcher } from "../../helpers/time";
import * as S from './styled';

const DateInterval: React.FC = () => {
  const timeDispatch = new TimeDispatcher();
  const startDate = timeDispatch.GetStartDate();
  const endDate = timeDispatch.GetEndDate();

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
