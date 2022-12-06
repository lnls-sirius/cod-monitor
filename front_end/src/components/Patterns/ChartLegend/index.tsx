import React from "react";

import Item from "../Item";
import { colors } from "../../../assets/style/themes";
import { LegendInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: LegendInterface = {
  color: colors.bg.transparent,
  isVisible: true,
  children: null,
  deleteAction: null,
  visibleAction: ()=>null
}

const ChartLegend: React.FC<LegendInterface> = (props) => {
  // Display the legend of one axis of the chart

  // Set visible Option to the Axis element
  function showVisibleOpt(): React.ReactElement | string {
    if(props.deleteAction !== null){
      return (
        <Item
          icon='eye'
          stateActive={false}
          action={props.visibleAction}
          tooltip={
            "Toggle element's chart visibility"}/>)
    }
    return ''
  }

  // Set delete Option to the Axis element
  function showDeleteOpt(): React.ReactElement | string {
    if(props.deleteAction !== null){
      return (
        <Item
          icon='trash'
          stateActive={false}
          action={props.deleteAction}
          tooltip={
            "Remove element from the chart"}/>)
    }
    return ''
  }

  return (
    <S.ItemWrapper
      isVisible={props.isVisible}>
        <S.Square color={props.color} />
        {props.children}
        {showVisibleOpt()}
        {showDeleteOpt()}
    </S.ItemWrapper>
  );
}

ChartLegend.defaultProps = defaultProps;
export default ChartLegend;
