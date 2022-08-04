import React from "react";
import { timeOptions } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeShow: React.FC<timeOptions> = (props) => {
  return(
    <S.TimeWrapper>
      {props.date.toLocaleString()}
    </S.TimeWrapper>
  );
};

export default TimeShow;
