import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getIntervalTime, getTimeMilliseconds, intervals } from "../../../controllers/Time/interval";
import { TimeDispatcher } from '../../../redux/dispatcher';
import * as S from './styled';

function mapStateToProps(state: any){
  const {time_mode, start_date, end_date} = state.time;
  return {
    timeMode: time_mode,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
  }
}

const Interval: React.FC<any> = (props): JSX.Element => {
  const [selIntBtn, setIntBtn] = useState("1h");

  useEffect(() => {
    const timeArray = intervals[selIntBtn];
    if(timeArray){
      setInterval(parseFloat(timeArray[0]), timeArray[1], selIntBtn)
    }
  },[props.endDate, props.startDate, selIntBtn]);

  function setInterval(time: number, unit: string, name: string){
    let timeMil, newDate;
    timeMil = time * getTimeMilliseconds(unit);
    setIntBtn(name);
    switch(props.timeMode){
      case 0: {
        newDate = getIntervalTime(-timeMil, props.endDate);
        TimeDispatcher.SetStartDate(newDate);
        break;
      }
      case 1:{
        newDate = getIntervalTime(timeMil, props.startDate);
        TimeDispatcher.SetEndDate(newDate);
        break;
      }
    }
  }

  function timeInterval(){
    if(props.timeMode != 2){
      return Object.entries(intervals).reverse().map(([name, data]: any) => {
        let stateBtn = false;
        if(selIntBtn == name){
          stateBtn = true;
        }
        return <S.IntervalBtn
            onClick={()=>setInterval(data[0], data[1], name)}
            selected={stateBtn}>
              {name}
          </S.IntervalBtn>;
      });
    }
  }

  return (
    <S.ItemWrapper>
      {timeInterval()}
    </S.ItemWrapper>
  );
};

export default connect(mapStateToProps)(Interval);
