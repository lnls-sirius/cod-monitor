import React from "react";
import { faTrashCan, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import Item from "../../Patterns/Item";
import * as S from './styled';

const OrbitInterval: React.FC = () => {

  function timeMode(type: string){
    return "123";
  }

  return(
    <S.TextWrapper>
      <S.TextWrapper>
        Start:
          {timeMode('Start')}
      </S.TextWrapper>
      <S.TextWrapper>
        End:
          {timeMode('End')}
      </S.TextWrapper>
      <Item
        icon={faPencilAlt}
        action={()=>null}/>
      <Item
        icon={faTrashCan}
        action={()=>null}/>
    </S.TextWrapper>
  );
};

export default OrbitInterval;
