import React from "react";
import { connect } from "react-redux";
import { intervalDict } from "../../../controllers/Time/constants";
import { StoreInterface } from "../../../redux/storage/store";
import { DictBaseDate, TimeInformation } from "../../../controllers/Time/interfaces";
import { countIntervalMode, getDate, setDate } from "../../../controllers/Time/functions";
import { faClock, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import TimeInput from "../TimeInput";
import TimeShow from "../../Date/TimeShow";
import Item from "../../Patterns/Item";
import { TimeDispatcher } from "../../../redux/dispatcher";
import { randomIdGen } from "../../../controllers/Patterns/functions";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {time_mode, start_date, end_date, ref_date, date_list} = state.time;
  return {
    intervalMode: time_mode,
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(ref_date),
    interval_list: JSON.parse(date_list),
    changeTime: false
  }
}

const DateInterval: React.FC<TimeInformation & {timeRef: boolean}> = (props) => {

  function timeMode(type: string){
    let mode = intervalDict[type][props.intervalMode];
    if(mode){
      return <TimeInput
        id="main"
        type={type}
        date={getDate(props, type)}
        onChange={props.timeRef}
        setDate={setDate}/>;
    }
    return <TimeShow
      date={getDate(props, type)}/>;
  }

  // function addDateInterval(intervalList: DictBaseDate){
  //   intervalList[randomIdGen(intervalList)] = {
  //     start: props.start,
  //     end: props.end
  //   }
  //   TimeDispatcher.setIntervalList(intervalList);
  //   TimeDispatcher.setChangeTime(true);
  // }

  function showReference(): React.ReactElement{
    if(props.timeRef){
      return (
        <S.TextWrapper>
          Reference:
          <TimeInput
            id="main"
            type='Ref'
            date={getDate(props, 'Ref')}
            onChange={props.timeRef}
            setDate={setDate}/>
        </S.TextWrapper>
      )
    }
    return <div/>;
    // return <Item
    //     icon={faPlusCircle}
    //     action={()=>addDateInterval(props.interval_list)}/>;
  }

  return(
    <S.TextWrapper>
      <S.TextWrapper>
        From
          {timeMode('Start')}
      </S.TextWrapper>
      <S.TextWrapper>
        to
          {timeMode('End')}
      </S.TextWrapper>
      {showReference()}
      <Item
        icon={faClock}
        action={()=>countIntervalMode(props.intervalMode, props.timeRef)}/>
    </S.TextWrapper>
  );
};

export default connect(mapStateToProps)(DateInterval);
