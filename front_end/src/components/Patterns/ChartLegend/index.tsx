import React from "react";
import { LegendInterface } from "../../../controllers/Patterns/interfaces";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Item from "../Item";
import * as S from './styled';

const ChartLegend: React.FC<LegendInterface> = (props) => {

  function showDeleteOpt(){
    if(props.deleteAction !== null){
      return (
        <Item
          icon={faTrashCan}
          action={props.deleteAction}/>)
    }
  }

  return <S.ItemWrapper>
      <S.Square color={props.color} />
      {props.children}
      {showDeleteOpt()}
    </S.ItemWrapper>
}

export default ChartLegend;
