import React from "react";
import { connect } from "react-redux";

import DateInput from "../DateInput";
import DateShow from "../../Date/DateShow";
import Tooltip from "../../Patterns/Tooltip";
import { getDate, setDate, setIntervalMode } from "../../../controllers/time";
import { intervalDict } from "../../../assets/constants/date";
import { StoreInterface } from "../../../redux/storage/store";
import { DateIntervalInterface } from "../../../assets/interfaces/date";
import { SelectChange } from "../../../assets/interfaces/types";
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
  intervalMode: 'Start',
  start: new Date(),
  end: new Date(),
  refDate: new Date(),
  timeRef: false
};

const DateInterval: React.FC<DateIntervalInterface> = (props) => {
  // Component that show the 2 Time Markers, the reference and the time mode button

  function dateMode(type: string): React.ReactElement {
    // Changes the type of the component
    let mode: boolean = intervalDict[props.intervalMode][type];
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
          Diff Ref:
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
    <S.MenuWrapper>
      <S.DateWrapper>
        <S.TextWrapper>
          Marker-1
            {dateMode('Start')}
        </S.TextWrapper>
        <S.TextWrapper>
          Marker-2
            {dateMode('End')}
        </S.TextWrapper>
        <S.TextWrapper>
          <Tooltip
              text="Change the date reference of the interval buttons"
              movable={false}>
            <S.SelectTime
              value={props.intervalMode}
              onChange={(selec: SelectChange)=>setIntervalMode(selec.target.value)}>
                <option value='Start' label='Start'/>
                <option value='End' label='End'/>
                <option value='None' label='None'/>
            </S.SelectTime>
          </Tooltip>
        </S.TextWrapper>
      </S.DateWrapper>
      <S.DateWrapper>
        {inputReference()}
      </S.DateWrapper>
    </S.MenuWrapper>
  );
};

DateInterval.defaultProps = defaultProps;
export default connect(mapStateToProps)(DateInterval);
