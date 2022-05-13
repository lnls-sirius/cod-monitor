import React, { useState } from "react";
import { TimeDispatcher, outOfRange } from "../../helpers/time";
import * as S from './styled';

interface TimeOpt{
  action: string;
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const timeDispatch = new TimeDispatcher();
  const startDate = timeDispatch.GetStartDate();
  const endDate = timeDispatch.GetEndDate();
  const [hint, setHint] = useState("");
  const [time, setTime] = useState(initDate);

  function initDate(){
    switch(props.action) {
      case 'Start Time':{
        setHint(props.action);
        return startDate;
      }
      case 'End Time':{
        setHint(props.action);
        return endDate;
      }
      default:{
        return new Date();
      }
    }
  }

  function setTimeOpt(time: Date){
    switch (props.action) {
      case 'Start Time':{
        timeDispatch.SetStartDate(time);
        setTime(time);
        break;
      }
      case 'End Time':{
        timeDispatch.SetEndDate(time);
        setTime(time);
        break;
      }
    }
  }

  return(
    <S.InputTime
      title={hint}
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
