import React from "react";
import { bpmGroups } from "../../helpers/constants";
import { posX } from "../../helpers/pvs/PosX";
import Led from "../Led";
import * as S from './styled';

const AddPV: React.FC = () => {
  let ledProps: any = {};

  const onChildMount = (dataFromChild: any) => {
    ledProps[dataFromChild[2]] = {
      'state': dataFromChild[0],
      'setState': dataFromChild[1]
    }
  };

  function groupSelect(groupSelected: string){
    let searchString: string;
    if(groupSelected.includes('-')){
      let searchNames = groupSelected.split('-');
      searchString = searchNames[0]+":DI-BPM-"+searchNames[1];
    }else{
      searchString = groupSelected;
    }
    posX.map((name: any)=>{
      if(name.includes(searchString)){
        let ledState = ledProps[name];
        ledState['setState'](!ledState['state']);
      }
    })
  }

  function findPV(number: string, name: string){
    let pvName;
    if(name.includes('-1') || name.includes('-2')){
      let nameDiv = name.split('-');
      pvName = "SI-"+number+nameDiv[0]+":DI-BPM-"+nameDiv[1]+":PosX-Mon";
    }else{
      pvName = "SI-"+number+name+":DI-BPM:PosX-Mon";
    }
    return <Led
            id={pvName}
            mountData={onChildMount}/>;
  }

  function pvNumber(){
    return bpmGroups.bpmNumber.map((number: any)=>{
      return(
        <S.Column>
          <S.Header
            onClick={() => groupSelect(number)}>
              {number}
          </S.Header>
        </S.Column>
      )
    })
  }

  function pvTable(){
    return bpmGroups.bpmName.map((name: any)=>{
      return(
        <S.Row>
          <S.Header
            onClick={() => groupSelect(name)}>
              {name}
          </S.Header>
          {
            bpmGroups.bpmNumber.map((number: any)=>{
              return <S.Column>{findPV(number, name)}</S.Column>
            })
          }
        </S.Row>
      )
    })
  }

  return(
    <S.Table>
      <td></td>
      {pvNumber()}
      {pvTable()}
    </S.Table>
  );
};

export default AddPV;
