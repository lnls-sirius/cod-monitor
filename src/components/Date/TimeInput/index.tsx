import React from "react";
import { TimeDispatcher } from '../../../redux/dispatcher';
import { timeOptions } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeInput: React.FC<timeOptions> = (props) => {

  function setTimeOpt(date: Date){
    switch (props.id) {
      case 'Start Time':{
        TimeDispatcher.SetStartDate(date);
        break;
      }
      case 'End Time':{
        TimeDispatcher.SetEndDate(date);
        break;
      }
      case 'Ref Time':{
        TimeDispatcher.SetRefDate(date);
        break;
      }
    }
  }

  return(
    <S.InputTime
      title={props.id}
      showTimeSelect
      selected={props.date}
      onChange={(time: Date)=>setTimeOpt(time)}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="dd/MM/yy h:mm:ss aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
