import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { bpmGroups } from "../../helpers/bpm";
import { BpmDispatcher } from '../../helpers/bpm';
import { posX } from "../../helpers/bpms/PosX";
import Led from "../Led";
import * as S from './styled';

const AddBPM: React.FC = () => {
  const bpmDispatch = new BpmDispatcher();
  const ledStates = useSelector((state: any) => state.bpm.listBpm);
  const states = JSON.parse(ledStates);
  let ledProps: any = {};

  useEffect(() => {
    bpmDispatch.setBpmList(JSON.stringify(ledProps));
  },[ledProps]);

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

  function getLedState(bpm_name: string){
    if (Object.keys(states).length === 0) {
      return false;
    }else{
      return states[bpm_name]['state'];
    }
  }

  function findBPM(number: string, name: string){
    let bpmName, state;
    if(name.includes('-1') || name.includes('-2')){
      let nameDiv = name.split('-');
      bpmName = "SI-"+number+nameDiv[0]+":DI-BPM-"+nameDiv[1]+":PosX-Mon";
    }else{
      bpmName = "SI-"+number+name+":DI-BPM:PosX-Mon";
    }
    state = getLedState(bpmName);
    return <Led
            id={bpmName}
            mountData={onChildMount}
            initState={state}/>;
  }

  function bpmNumber(){
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

  function bpmTable(){
    return bpmGroups.bpmName.map((name: any)=>{
      return(
        <S.Row>
          <S.Header
            onClick={() => groupSelect(name)}>
              {name}
          </S.Header>
          {
            bpmGroups.bpmNumber.map((number: any)=>{
              if((number=='01') && name=='M1'){
                return <td></td>
              }else{
                return <S.Column>{findBPM(number, name)}</S.Column>
              }
            })
          }
        </S.Row>
      )
    })
  }

  function bpmFirst(){
    const name = bpmGroups.bpmName[0];
    const number = bpmGroups.bpmNumber[0];
    return(
      <S.Row>
        <S.Header
          onClick={() => groupSelect(name)}>
            {name}
        </S.Header>
        <S.Column>{findBPM(number, name)}</S.Column>
      </S.Row>
    )
  }

  return(
    <S.Table>
      <td></td>
      {bpmNumber()}
      {bpmTable()}
      {bpmFirst()}
    </S.Table>
  );
};

export default AddBPM;
