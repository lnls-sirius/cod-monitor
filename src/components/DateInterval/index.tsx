import React from "react";
import { connect } from "react-redux";
import { intervalDict, TimeDispatcher } from "../../helpers/time";
import TimeInput from "../TimeInput";
import TimeShow from "../TimeShow";
import * as S from './styled';

function mapStateToProps(state: any){
  const {time_mode, start_date, end_date, ref_date} = state.time;
  return {
    intervalMode: time_mode,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date)
  }
}

const DateInterval: React.FC<any> = (props) => {
  const timeDispatch = new TimeDispatcher();
  function getDate(type: string){
    switch (type) {
      case 'Start Time':{
        return props.startDate;
      }
      case 'End Time':{
        return props.endDate;
      }
      case 'Ref Time':{
        return props.refDate;
      }
    }
  }

  function countIntervalMode(){
    if(props.intervalMode != 2){
      timeDispatch.SetTimeMode(props.intervalMode + 1);
    }else{
      timeDispatch.SetTimeMode(0);
    }
  }

  function timeMode(type: string){
    let mode = intervalDict[type][props.intervalMode];
    if(mode){
      return <TimeInput
        action={type}
        date={getDate(type)}/>;
    }else{
      return <TimeShow
        action={type}/>;
    }
  }

  return(
    <S.TextWrapper>
      From
        <S.TextWrapper>{timeMode('Start Time')}</S.TextWrapper>
      to
        <S.TextWrapper>{timeMode('End Time')}</S.TextWrapper>
      Reference:
        <TimeInput
          action='Ref Time'
          date={getDate('Ref Time')}/>
      <S.ChangeMode onClick={()=>countIntervalMode()}>M</S.ChangeMode>
    </S.TextWrapper>
  );
};

export default connect(mapStateToProps)(DateInterval);
