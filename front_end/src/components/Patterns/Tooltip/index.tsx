import React from "react";
import { TooltipInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: TooltipInterface = {
  children: null,
  text: '',
  movable: false
}

const Tooltip: React.FC<TooltipInterface> = (props) => {
  return (
    <S.TooltipWrapper>
      {props.children}
      <S.TooltipText
        state={props.movable}>
          {props.text}
      </S.TooltipText>
    </S.TooltipWrapper>
  )
};

Tooltip.defaultProps = defaultProps;
export default Tooltip;
