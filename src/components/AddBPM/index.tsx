import React, { useState } from "react";
import { useSelector } from "react-redux";
import { bpmGroups } from "../../assets/bpms/groups";
import { changeStates, objectExists, reverseAxis } from "../../controllers/Structure/functions";
import { InitLed } from "../../controllers/Structure/interfaces";
import { BpmDispatcher } from "../../redux/dispatcher";
import Led from "../Patterns/Led";
import * as S from './styled';

let othAxis: any = {};
let ledProps: any = {};
let ledSetters: {[key:string]: React.Dispatch<React.SetStateAction<boolean>>} = {};

const BPMLed: React.FC<InitLed> = (props) => {
  const bpmList = useSelector((state: any) => state.bpm.list);

  function getName(name: string, axis: string): string{
    return name + ':Pos'+axis+'-Mon';
  }

  function initStates(bpm_name: string): boolean{
    const states: any = JSON.parse(bpmList);
    if(objectExists(states, getName(bpm_name, props.axis))){
      ledProps[bpm_name] = states[getName(bpm_name, props.axis)];
    }else{
      ledProps[bpm_name] = false;
    }
    if(objectExists(states, getName(bpm_name, reverseAxis(props.axis)))){
      othAxis[bpm_name] = states[getName(bpm_name, reverseAxis(props.axis))];
    }else{
      othAxis[bpm_name] = false;
    }
    return ledProps[bpm_name];
  }

  return (<Led
            id={props.id}
            mountData={props.mountData}
            updateData={props.updateData}
            initState={initStates(props.id)} />);
}

const AddBPM: React.FC = () => {
  const [axis, setAxis]: any = useState('X');

  function getName(name: string, reverse: boolean): string{
    let axisT = axis;
    if(reverse == true){
      axisT = reverseAxis(axis);
    }
    return name + ':Pos' + axisT + '-Mon';
  }

  function saveData(){
    let list: any = {};
    Object.entries(ledProps).map(async ([name, prop]: any) => {
      list[getName(name, false)] = prop;
      list[getName(name, true)] = othAxis[name];
    });
    BpmDispatcher.setBpmList(JSON.stringify(list));
  }

  const onChildUpdate = (state: boolean, id: string) => {
    ledProps[id] = state;
    saveData();
  }

  const onChildMount = (setter: React.Dispatch<React.SetStateAction<boolean>>, id: string) => {
    ledSetters[id] = setter;
  };

  // Isn't working properly
  function coupleAxis(){
    Object.entries(ledProps).map(async ([name, prop]: any) => {
      const newAxisLed = othAxis[name] || ledProps[name];
      ledProps[name] = newAxisLed;
      othAxis[name] = newAxisLed;
      ledSetters[name](newAxisLed);
    });
  }

  function onChangeAxis(axis_name: string){
    if(axis_name == 'X' || axis_name == 'Y'){
      [ledProps, othAxis] = changeStates(ledProps, othAxis);
      Object.entries(ledProps).map(([name, prop]: any) => {
        ledSetters[name](prop);
      });
    }else{
      coupleAxis();
      saveData();
      axis_name = 'X';
    }
    setAxis(axis_name);
  }

  function bpmAxis(){
    return bpmGroups.axis.map((name)=>{
      if(axis == name){
        return <S.Select selected={true}>{name}</S.Select>;
      }else{
        return <S.Select selected={false} onClick={() => onChangeAxis(name)}>{name}</S.Select>;
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
    Object.entries(ledProps).map(([name, state]: any)=>{
      if(name.includes(searchString)){
        ledSetters[name](!state);
      }
    })
  }

  function findBPM(number: string, name: string){
    let bpmName;
    if(name.includes('-1') || name.includes('-2')){
      let nameDiv = name.split('-');
      bpmName = "SI-"+number+nameDiv[0]+":DI-BPM-"+nameDiv[1];
    }else{
      bpmName = "SI-"+number+name+":DI-BPM";
    }
    return <BPMLed
      id={bpmName}
      axis={axis}
      mountData={onChildMount}
      updateData={onChildUpdate}/>;
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
