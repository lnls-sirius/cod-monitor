import React from "react";
import { GetDateInterface } from "../../../controllers/Time/interfaces";
import * as S from './styled';

const TimeShow: React.FC<GetDateInterface> = (props) => {
  return(
    <S.TimeWrapper>
      {props.date.toLocaleString()}
    </S.TimeWrapper>
  );
};

export default TimeShow;
