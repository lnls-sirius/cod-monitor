import React from "react";

import { SetDateInterface } from "../../../assets/interfaces/date";
import * as S from './styled';

const defaultProps: SetDateInterface = {
  date: new Date(),
  type: 'Start',
  setDate: ()=>null
};

const DateInput: React.FC<SetDateInterface> = (props) => {
  // Component that shows an input of the type date

  function setDateImp(time: Date): void {
    props.setDate(props.type, time);
  }

  return(
    <S.InputTime
      showTimeSelect
      selected={props.date}
      onChange={setDateImp}
      timeFormat="HH:mm"
      timeCaption="time"
      dateFormat="yyyy/MM/dd h:mm:ss aa"
      maxDate={new Date()}/>
  );
};

DateInput.defaultProps = defaultProps;
export default DateInput;
