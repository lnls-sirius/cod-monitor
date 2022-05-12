import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setStart, setEnd } from '../../features/timeStore';
import { outOfRange } from "../../helpers/time";
import * as S from './styled';

interface TimeOpt{
  action: string;
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const dispatch = useDispatch();
  const startDate = useSelector((state: any) => state.time.start_date);
  const endDate = useSelector((state: any) => state.time.end_date);
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
        if(outOfRange(time, endDate)){
          dispatch(setStart(time));
          setTime(time);
        }
        break;
      }
      case 'End Time':{
        if(outOfRange(startDate, time)){

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
