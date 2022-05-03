import React, { useRef } from "react";
import * as S from './styled';

interface TimeOpt{
  action: string;
}

function setTime(time: Date){
  console.log(time.toString());
}

const TimeInput: React.FC<TimeOpt> = (props) => {
  const curTime = useRef(new Date());
  return(
    <S.InputTime
      title="Start/end timestamp"
      showTimeSelect
      selected={null}
      onChange={(time: Date)=>setTime(time)}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="dd/MM/yy h:mm aa"
      maxDate={new Date()}
      />
  );
};

export default TimeInput;
