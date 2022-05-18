import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TimeDispatcher, outOfRange } from "../../helpers/time";
import * as S from './styled';

interface TimeOpt{
  action: string;
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const timeDispatch = new TimeDispatcher();
  const startDate = new Date(useSelector((state: any) => state.time.start_date));
  const endDate = new Date(useSelector((state: any) => state.time.end_date));
  const refDate = new Date(useSelector((state: any) => state.time.ref_date));
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
      case 'Ref Time':{
        setHint(props.action);
        return refDate;
      }
      default:{
        return new Date();
      }
    }
  }

  function setTimeOpt(time: Date){
    switch (props.action) {
      case 'Start Time':{
        if(outOfRange(time, endDate)){
          timeDispatch.SetStartDate(time);
          setTime(time);
        }
        break;
      }
      case 'End Time':{
        if(outOfRange(startDate, time)){
          timeDispatch.SetEndDate(time);
          setTime(time);
        }
        break;
      }
      case 'Ref Time':{
        if(outOfRange(startDate, endDate, time)){
          timeDispatch.SetRefDate(time);
          setTime(time);
        }
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
