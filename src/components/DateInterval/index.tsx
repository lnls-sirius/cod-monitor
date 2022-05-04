import React, { useEffect, useState } from "react";
import { getEndDate, getStartDate } from "../../helpers/time";
import * as S from './styled';

const DateInterval: React.FC = () => {
  const [startDate, setStartDate] = useState(getStartDate());
  const [endDate, setEndDate] = useState(getEndDate());

  useEffect(()=>{
    setStartDate(startDate);
  },[sessionStorage.getItem('Start Time')])

  useEffect(()=>{
    setEndDate(getEndDate());
  },[sessionStorage.getItem('End Time')])

  return(
    <S.TextWrapper>
      From {startDate.toLocaleString()} to {endDate.toLocaleString()}
    </S.TextWrapper>
  );
};

export default DateInterval;
