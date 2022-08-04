import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bpmGroups } from "../../assets/bpms/groups";
import { BpmDispatcher } from '../../redux/dispatcher';
import Led from "../Patterns/Led";
import * as S from './styled';

const AddBPM: React.FC = () => {
  const bpmList = useSelector((state: any) => state.bpm.list);
  const [axis, setAxis]: any = useState('X');
  const [oldAxis, setOldAxis]: any = useState('X');
  let othAxis: any = {};
  let ledProps: any = {};

  function getName(name: string, reverse: boolean): string{
    let axisT = axis;
    if(reverse == true){
      if(axis == 'X'){
        axisT = 'Y';
      }else{
        axisT = 'X';
      }
    }
    switch(axisT){
      case 'X':{
        return name + ':PosX-Mon';
      }
      case 'Y':{
        return name + ':PosY-Mon';
      }
      default:{
        return name + ':PosY-Mon';
      }
    }
  }

  function saveData(){
    let list: any = {};
    Object.entries(ledProps).map(async ([name, prop]: any) => {
      list[getName(name, false)] = prop.state;
      list[getName(name, true)] = othAxis[name].state;
    });
    BpmDispatcher.setBpmList(JSON.stringify(list));
  }

  useEffect(() => {
    if(oldAxis != axis){
      saveData();
      if(axis == 'X'){
        let extraAxis = othAxis;
        othAxis = ledProps;
        ledProps = extraAxis;
        onChangeAxis();
      }else if(axis == 'Y'){
        let extraAxis = ledProps;
        ledProps = othAxis;
        othAxis = extraAxis;
        onChangeAxis();
      }else{
        coupleAxis();
        setAxis('X');
      }
      setOldAxis(axis);
    }
  },[axis]);

  useEffect(() => {
    saveData();
  },[ledProps]);


  const onChildMount = (dataFromChild: any) => {
    ledProps[dataFromChild[2]] = {
      'state': dataFromChild[0],
      'setState': dataFromChild[1]
    }
    othAxis[dataFromChild[2]] = {
      'state': getLedState(getName(dataFromChild[2], true)),
      'setState': dataFromChild[1]
    }
  };

  function coupleAxis(){
    Object.entries(ledProps).map(async ([name, prop]: any) => {
      const newAxisLed = getLedState(getName(name, false)) || getLedState(getName(name, true));
      prop.state = newAxisLed;
      othAxis[name].state = newAxisLed;
      prop['setState'](newAxisLed);
    });
  }

  function onChangeAxis(){
    Object.entries(ledProps).map(async ([name, prop]: any) => {
      const newAxisLed = getLedState(getName(name, false));
      prop['setState'](newAxisLed);
      prop.state = newAxisLed;
    });
  }

  function bpmAxis(){
    return bpmGroups.axis.map((name)=>{
      if(axis == name){
        return <S.Select selected={true}>{name}</S.Select>;
      }else{
        return <S.Select selected={false} onClick={() => setAxis(name)}>{name}</S.Select>;
      }
    });
  }

  function groupSelect(groupSelected: string){
    let searchString: string;
    if(groupSelected.includes('-')){
      let searchNames = groupSelected.split('-');
      searchString = searchNames[0]+":DI-BPM-"+searchNames[1];
    }else{
      searchString = groupSelected;
    }
    Object.keys(ledProps).map((name: any)=>{
      if(name.includes(searchString)){
        let ledState = ledProps[name];
        ledState['setState'](!ledState.state);
      }
    })
  }

  function getLedState(bpm_name: string){
    const states: any = JSON.parse(bpmList);
    if (Object.keys(states).length === 0 || states[bpm_name] == undefined) {
      return false;
    }else{
      return states[bpm_name];
    }
  }

  function findBPM(number: string, name: string){
    let bpmName, state;
    if(name.includes('-1') || name.includes('-2')){
      let nameDiv = name.split('-');
      bpmName = "SI-"+number+nameDiv[0]+":DI-BPM-"+nameDiv[1];
    }else{
      bpmName = "SI-"+number+name+":DI-BPM";
    }
    state = getLedState(getName(bpmName, false));
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
      {bpmAxis()}
      {bpmNumber()}
      {bpmTable()}
      {bpmFirst()}
    </S.Table>
  );
};

export default AddBPM;
