import React from "react";
import { useSelector } from "react-redux";
import * as S from './styled';

const TimeShow: React.FC<{action: string}> = (props) => {
  const startDate = new Date(useSelector((state: any) => state.time.start_date));
  const endDate = new Date(useSelector((state: any) => state.time.end_date));

  function initDate(){
    switch(props.action) {
      case 'Start Time':{
        return startDate.toLocaleString();
      }
      case 'End Time':{
        return endDate.toLocaleString();
      }
      default:{
        return "Error";
      }
    }
  }

  return(
    <S.TimeWrapper>
      {initDate()}
    </S.TimeWrapper>
  );
};

export default TimeShow;
