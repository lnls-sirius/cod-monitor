import React from "react";
import { SetDateInterface } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeInput: React.FC<SetDateInterface> = (props) => {

  function setDateImp(time: Date){
    props.setDate(props.type, time, props.onChange, props.id);
  }

  return(
    <S.InputTime
      showTimeSelect
      id={props.id}
      selected={props.date}
      onChange={setDateImp}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="yyyy/MM/dd h:mm:ss aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
