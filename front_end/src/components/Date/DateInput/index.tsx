import React from "react";
import Tooltip from "../../Patterns/Tooltip";
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

  function buildTooltipText(): string {
    let text: string = "Set the "
    if(props.type == 'Ref'){
      text += "reference"
    }else{
      text += props.type
    }
    if(window.location.pathname == "/orbitDrift"){
      text += " interval"
    }else{
      text += " date on the chart" 
    }
    return text
  }

  return(
    <Tooltip
        text={buildTooltipText()}>
      <S.InputTime
        showTimeSelect
        selected={props.date}
        onChange={setDateImp}
        timeFormat="HH:mm"
        timeCaption="time"
        dateFormat="yyyy/MM/dd h:mm:ss aa"
        maxDate={new Date()}/>
    </Tooltip>
  );
};

DateInput.defaultProps = defaultProps;
export default DateInput;
