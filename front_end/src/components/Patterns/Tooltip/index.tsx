import React from "react";
import { TooltipInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: TooltipInterface = {
  children: null,
  text: ''
}

const Tooltip: React.FC<TooltipInterface> = (props) => {
  return (
    <S.TooltipWrapper>
      {props.children}
      <S.TooltipText>
        {props.text}
      </S.TooltipText>
    </S.TooltipWrapper>
  )
};

Tooltip.defaultProps = defaultProps;
export default Tooltip;
