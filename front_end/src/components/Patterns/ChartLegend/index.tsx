import React from "react";

import Item from "../Item";

import { LegendInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

const defaultProps: LegendInterface = {
  color: '#FFFFFFFF',
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
          action={props.visibleAction}/>)
    }
    return ''
  }

  // Set delete Option to the Axis element
  function showDeleteOpt(): React.ReactElement | string {
    if(props.deleteAction !== null){
      return (
        <Item
          icon='trash'
          action={props.deleteAction}/>)
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
