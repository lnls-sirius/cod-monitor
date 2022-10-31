import React from "react";
import { connect } from "react-redux";

import DateInput from "../DateInput";
import DateShow from "../../Date/DateShow";
import Item from "../../Patterns/Item";

import { countIntervalMode, getDate, setDate } from "../../../controllers/Time/functions";
import { intervalDict } from "../../../assets/constants/date";
import { StoreInterface } from "../../../redux/storage/store";
import { DateIntervalInterface } from "../../../assets/interfaces/date";

import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const { time_mode, start_date, end_date, ref_date } = state.time;
  return {
    intervalMode: time_mode,
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(ref_date)
  }
}

const defaultProps: DateIntervalInterface = {
  intervalMode: 0,
  start: new Date(),
  end: new Date(),
  refDate: new Date(),
  timeRef: false
};

const DateInterval: React.FC<DateIntervalInterface> = (props) => {
  // Component that show the 2 Time Markers, the reference and the time mode button

  function dateMode(type: string): React.ReactElement {
    // Changes the type of the component
    let mode = intervalDict[type][props.intervalMode];
    if(mode){
      return <DateInput
        type={type}
        date={getDate(props, type)}
        setDate={setDate}/>;
    }
    return <DateShow
      date={getDate(props, type)}/>;
  }

  function inputReference(): React.ReactElement {
    // Show the input for the date reference if needed
    if(props.timeRef){
      return (
        <S.TextWrapper>
          Reference:
          <DateInput
            type='Ref'
            date={props.refDate}
            setDate={setDate}/>
        </S.TextWrapper>
      )
    }
    return <div/>;
  }

  return(
    <S.TextWrapper>
      <S.TextWrapper>
        Marker-1
          {dateMode('Start')}
      </S.TextWrapper>
      <S.TextWrapper>
        Marker-2
          {dateMode('End')}
      </S.TextWrapper>
      {inputReference()}
      <Item
        icon='clock'
        action={()=>countIntervalMode(props.intervalMode)}/>
    </S.TextWrapper>
  );
};

DateInterval.defaultProps = defaultProps;
export default connect(mapStateToProps)(DateInterval);
