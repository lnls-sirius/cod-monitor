import React from "react";
import { format } from 'date-fns'
import { GetDateInterface } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeShow: React.FC<GetDateInterface> = (props) => {
  return(
    <S.TimeWrapper>
      {format(props.date, 'yyyy/MM/dd h:mm:ss aa')}
    </S.TimeWrapper>
  );
};

export default TimeShow;
