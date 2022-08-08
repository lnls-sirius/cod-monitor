import React from "react";
import { connect } from "react-redux";
import { intervalDict } from "../../../controllers/Time/interval";
import { TimeDispatcher } from '../../../redux/dispatcher';
import { StoreInterface } from "../../../redux/storage/store";
import TimeInput from "../TimeInput";
import TimeShow from "../../Date/TimeShow";
import * as S from './styled';
import Item from "../../Patterns/Item";
import { timeInformation } from "../../../controllers/Time/interfaces";

function mapStateToProps(state: StoreInterface){
  const {time_mode, start_date, end_date, ref_date} = state.time;
  return {
    intervalMode: time_mode,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date)
  }
}

// const TimeMode: React.FC = () => {
//   // return <Item id={"657"} title={"546546"} type={0}/>;
// }

const DateInterval: React.FC<timeInformation> = (props) => {

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
      default: {
        return new Date();
      }
    }
  }

  function countIntervalMode(){
    if(props.intervalMode != 2){
      TimeDispatcher.SetTimeMode(props.intervalMode + 1);
    }else{
      TimeDispatcher.SetTimeMode(0);
    }
  }

  function timeMode(type: string){
    let mode = intervalDict[type][props.intervalMode];
    if(mode){
      return <TimeInput
        id={type}
        date={getDate(type)}/>;
    }else{
      return <TimeShow
        date={getDate(type)}/>;
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
          id='Ref Time'
          date={getDate('Ref Time')}/>
      <S.ChangeMode onClick={()=>countIntervalMode()}>M</S.ChangeMode>
    </S.TextWrapper>
  );
};

export default connect(mapStateToProps)(DateInterval);
