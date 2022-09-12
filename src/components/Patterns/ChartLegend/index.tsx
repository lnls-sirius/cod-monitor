import React from "react";
import { LegendInterface } from "../../../controllers/Patterns/interfaces";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Item from "../Item";
import * as S from './styled';

const ChartLegend: React.FC<LegendInterface> = (props) => {

    return <S.ItemWrapper>
      <S.Square color={props.color} />
      {props.children}
      <Item
        icon={faTrashCan}
        action={props.deleteAction}/>
    </S.ItemWrapper>
}

export default ChartLegend;
