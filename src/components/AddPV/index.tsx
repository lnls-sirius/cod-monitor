import React from "react";
import { bpmGroups } from "../../helpers/constants";
import Led from "../Led";
import * as S from './styled';

function findPV(number: string, name: string){
  let pvName;
  if(name.includes('-1') || name.includes('-2')){
    let nameDiv = name.split('-');
    pvName = "SI-"+number+nameDiv[0]+":DI-BPM-"+nameDiv[1]+":PosX-Mon";
  }else{
    pvName = "SI-"+number+name+":DI-BPM:PosX-Mon";
  }
  return <Led key={pvName}/>;
}

function pvTable(){
  return bpmGroups.bpmName.map((name: any)=>{
    return(
      <S.Row>
        {
          bpmGroups.bpmNumber.map((number: any)=>{
              return <S.Column>{findPV(number, name)}</S.Column>
          })
        }
      </S.Row>
    )
  })
}

const AddPV: React.FC = () => {
  return(
    <S.Table>{pvTable()}</S.Table>
  );
};

export default AddPV;
