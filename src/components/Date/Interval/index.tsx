import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TimeInformation } from "../../../controllers/Time/interfaces";
import { intervals, refModes } from "../../../controllers/Time/constants";
import { StoreInterface } from "../../../redux/storage/store";
import { getDate, getIntervalTime, getTimeMilliseconds, setDate } from "../../../controllers/Time/functions";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {time_mode, start_date, end_date} = state.time;
  return {
    intervalMode: time_mode,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date()
  }
}

const Interval: React.FC<TimeInformation> = (props): React.ReactElement => {
  const [selIntBtn, setIntBtn] = useState("1h");

  useEffect(() => {
    const timeArray = intervals[selIntBtn];
    if(timeArray){
      setInterval(parseFloat(timeArray[0]), timeArray[1], selIntBtn)
    }
  },[props.endDate, props.startDate, selIntBtn]);

  function setInterval(time: number, unit: string, name: string){
    if(refModes[props.intervalMode] != undefined){
      const timeMil = time * getTimeMilliseconds(unit);
      setIntBtn(name);

      setDate(
        refModes[props.intervalMode].mod,
        getIntervalTime(
          timeMil,
          getDate(props, refModes[props.intervalMode].ref),
          props.intervalMode));
    }
  }

  function timeInterval(){
    if(props.intervalMode != 2){
      return Object.entries(intervals).reverse().map(([name, data]: [key: string, value: Array<string>]) => {
        let stateBtn = false;
        if(selIntBtn == name){
          stateBtn = true;
        }
        return <S.IntervalBtn
            onClick={()=>setInterval(Number(data[0]), data[1], name)}
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
