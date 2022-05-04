import React, { useState } from "react";
import { setEndDate, setStartDate } from "../../helpers/time";
import * as S from './styled';

interface TimeOpt{
  action: string;
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const [time, setTime] = useState(new Date());

  function setTimeOpt(time: Date){
    switch (props.action) {
      case 'Start Time':{
        setStartDate(time);
        break;
      }
      case 'End Time':{
        setEndDate(time);
        break;
      }
    }
    setTime(time);
  }

  return(
    <S.InputTime
      title="Start/end timestamp"
      showTimeSelect
      selected={time}
      onChange={(time: Date)=>setTimeOpt(time)}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="dd/MM/yy h:mm aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
