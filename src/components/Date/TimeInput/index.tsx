import React from "react";
import { setDate } from "../../../controllers/Time/functions";
import { TimeOptions } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeInput: React.FC<TimeOptions> = (props) => {
  const inputType = props.id==undefined?"":props.id;

  return(
    <S.InputTime
      title={inputType}
      showTimeSelect
      selected={props.date}
      onChange={(time: Date)=>setDate(inputType, time)}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="dd/MM/yy h:mm:ss aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
