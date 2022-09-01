import React from "react";
import { BpmInterface } from "../../../controllers/Patterns/interfaces";
import { deleteBpm } from "../../../controllers/Chart/functions";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Item from "../Item";
import * as S from './styled';

const ChartLegend: React.FC<BpmInterface> = (props) => {

    function formatBPMName(name: string){
        name = name.replace('SI-', '');
        name = name.replace(':DI-BPM', '');
        name = name.replace('-Mon', '');
        return name;
    }

    return <S.ItemWrapper>
      <S.Square color={props.color} />
      <S.TextWrapper>
        {formatBPMName(props.name)}
      </S.TextWrapper>
      <Item
        icon={faTrashCan}
        action={()=>deleteBpm(props.name, props.bpmList)}/>
    </S.ItemWrapper>
}

export default ChartLegend;
