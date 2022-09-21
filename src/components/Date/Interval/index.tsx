import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { TimeInformation } from "../../../controllers/Time/interfaces";
import { intervals, refModes } from "../../../controllers/Time/constants";
import { StoreInterface } from "../../../redux/storage/store";
import { getDate, getTimeMilliseconds, setDate } from "../../../controllers/Time/functions";
import { TimeDispatcher } from "../../../redux/dispatcher";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {time_mode, start_date, end_date, change_time} = state.time;
  return {
    intervalMode: time_mode,
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(),
    changeTime: change_time,
    interval_list: {}
  }
}
const defaultProps: TimeInformation = {
  intervalMode: 0,
  start: new Date(),
  end: new Date(),
  refDate: new Date(),
  changeTime: false,
  interval_list: {}
};

const Interval: React.FC<TimeInformation & {onChange: boolean}> = (props): React.ReactElement => {
  const [selIntBtn, setIntBtn] = useState("1h");

  useEffect(() => {
    const timeArray = intervals[selIntBtn];
    if(timeArray){
      setInterval(parseFloat(timeArray[0]), timeArray[1], selIntBtn)
    }
  },[selIntBtn]);

  function setInterval(time: number, unit: string, name: string){
    const timeMil = time * getTimeMilliseconds(unit);
    TimeDispatcher.setIntervalMilliseconds(timeMil);
    const dateRef = getDate(props, refModes[props.intervalMode]);
    setDate(
      refModes[props.intervalMode], 
      dateRef,
      props.onChange);
    setIntBtn(name);
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

Interval.defaultProps = defaultProps;
export default connect(mapStateToProps)(Interval);
