import React from "react";
import {TimeDispatcher} from "../../helpers/time";
import * as S from './styled';

interface TimeOpt{
  action: string;
  date: Date;
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const timeDispatch = new TimeDispatcher();

  function setTimeOpt(date: Date, action: string){
    switch (action) {
      case 'Start Time':{
        timeDispatch.SetStartDate(date);
        break;
      }
      case 'End Time':{
        timeDispatch.SetEndDate(date);
        break;
      }
      case 'Ref Time':{
        timeDispatch.SetRefDate(date);
        break;
      }
    }
  }

  return(
    <S.InputTime
      title={props.action}
      showTimeSelect
      selected={props.date}
      onChange={(time: Date)=>setTimeOpt(time, props.action)}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="dd/MM/yy h:mm aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
