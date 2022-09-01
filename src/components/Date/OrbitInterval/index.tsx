import React from "react";
import { connect } from "react-redux";
import { intervalDict } from "../../../controllers/Time/constants";
import { StoreInterface } from "../../../redux/storage/store";
import { TimeInformation } from "../../../controllers/Time/interfaces";
import { countIntervalMode, getDate } from "../../../controllers/Time/functions";
import TimeInput from "../TimeInput";
import TimeShow from "../TimeShow";
import Item from "../../Patterns/Item";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {time_mode, start_date, end_date, ref_date} = state.time;
  return {
    intervalMode: time_mode,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date),
    changeTime: false
  }
}


const DateInterval: React.FC<TimeInformation & {timeRef: boolean}> = (props) => {

  function timeMode(type: string){
    let mode = intervalDict[type][props.intervalMode];
    if(mode){
      return <TimeInput
        id={type}
        date={getDate(props, type)}/>;
    }else{
      return <TimeShow
        date={getDate(props, type)}/>;
    }
  }

  function showReference(): React.ReactElement{
    if(props.timeRef){
      return (
        <S.TextWrapper>
          Reference:
          <TimeInput
            id='Ref'
            date={getDate(props, 'Ref')}/>
        </S.TextWrapper>
      )
    }
    return <div />;
  }

  return(
    <S.TextWrapper>
      <Item icon={faClock} action={()=>countIntervalMode(props.intervalMode)}/>
      <S.TextWrapper>
        From
          {timeMode('Start')}
      </S.TextWrapper>
      <S.TextWrapper>
        to
          {timeMode('End')}
      </S.TextWrapper>
      {showReference()}
    </S.TextWrapper>
  );
};

export default connect(mapStateToProps)(DateInterval);
