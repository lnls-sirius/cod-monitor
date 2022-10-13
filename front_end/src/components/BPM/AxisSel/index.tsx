import React, { useState } from "react";
import { bpmGroups } from "../../../assets/bpms/groups";
import { BpmDispatcher } from "../../../redux/dispatcher";
import * as S from './styled';

const AxisSelection: React.FC = () => {
  const [axis, setAxis] = useState('X');
  
  function changeAxis(axis: string){
    setAxis(axis);
    BpmDispatcher.setAxis(axis);
    BpmDispatcher.setChangeBpm(true);
  }

  function bpmAxis(): React.ReactElement[] {
    return bpmGroups.axis.map((name)=>{
      if (name != "Couple"){
        if(axis == name){
          return <S.Select selected={true}>{name}</S.Select>;
        }else{
          return <S.Select selected={false} onClick={() => changeAxis(name)}>{name}</S.Select>;
        }
      }
      return <div/>
    });
  }
  
  return(
    <S.Wrapper>
      {bpmAxis()}
    </S.Wrapper>
  );
};

export default AxisSelection;
