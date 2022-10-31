import React from "react";

import Item from "../Item";

import { LegendInterface } from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const defaultProps: LegendInterface = {
  color: '#FFFFFFFF',
  children: null,
  deleteAction: null
}

const ChartLegend: React.FC<LegendInterface> = (props) => {
  // Display the legend of one axis of the chart

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

  return <S.ItemWrapper>
      <S.Square color={props.color} />
      {props.children}
      {showDeleteOpt()}
    </S.ItemWrapper>
}

ChartLegend.defaultProps = defaultProps;
export default ChartLegend;
