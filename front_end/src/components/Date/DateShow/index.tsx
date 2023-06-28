import React from "react";
import { format } from 'date-fns'

import { GetDateInterface } from "../../../assets/interfaces/date";

import * as S from './styled';

const defaultProps: GetDateInterface = {
  date: new Date()
};

const DateShow: React.FC<GetDateInterface> = (props) => {
  // Component that shows a formatted date

  return(
    <S.TimeWrapper>
      {format(props.date, 'yyyy/MM/dd h:mm:ss.SSS')}
    </S.TimeWrapper>
  );
};

DateShow.defaultProps = defaultProps;
export default DateShow;
