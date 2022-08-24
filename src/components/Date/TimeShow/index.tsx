import React from "react";
import { TimeOptions } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeShow: React.FC<TimeOptions> = (props) => {
  return(
    <S.TimeWrapper>
      {props.date.toLocaleString()}
    </S.TimeWrapper>
  );
};

export default TimeShow;
