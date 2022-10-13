import React, { useState } from "react";
import { useSelector } from "react-redux";
import { bpmGroups } from "../../../assets/bpms/groups";
import { changeStates, getBpmName, objectExists, reverseAxis } from "../../../controllers/Patterns/functions";
import { InitLed, DictState, SetterDictState, DispatchBool, ArrDictState } from "../../../controllers/Patterns/interfaces";
import { BpmDispatcher } from "../../../redux/dispatcher";
import { StoreInterface } from "../../../redux/storage/store";
import Led from "../../Patterns/Led";
import * as S from './styled';

let othAxis: DictState = {};
let ledProps: DictState = {};
let ledSetters: SetterDictState = {};


const BPMLed: React.FC<InitLed> = (props) => {
  const bpmList = useSelector((state: StoreInterface) => state.bpm.bpm_list);

  function initStates(bpm_name: string): boolean {
    const states: DictState = JSON.parse(bpmList);

    let name_waxis = getBpmName(bpm_name, props.axis);
    if(objectExists(states, name_waxis)){
      ledProps[bpm_name] = states[name_waxis];
    }else{
      ledProps[bpm_name] = false;
    }

    name_waxis = getBpmName(bpm_name, reverseAxis(props.axis));
    if(objectExists(states, name_waxis)){
      othAxis[bpm_name] = states[name_waxis];
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
  const [axis, setAxis] = useState<string>('X');

  function saveData(): void {
    let list: DictState = {};

    Object.entries(ledProps).map(async ([name, prop]: ArrDictState) => {
      list[getBpmName(name, axis)] = prop;
      list[getBpmName(name, reverseAxis(axis))] = othAxis[name];
    });
    BpmDispatcher.setBpmList(JSON.stringify(list));
  }

  function onChildUpdate(state: boolean, id: string): void {
    ledProps[id] = state;
    saveData();
  }

  function onChildMount(setter: DispatchBool, id: string): void {
    ledSetters[id] = setter;
  };

  function changeAxis(): void {
    Object.entries(ledProps).map(([name, prop]: ArrDictState) => {
      ledSetters[name](prop);
    });
  }

  function coupleAxis(): void {
    Object.keys(ledProps).map(async (name: string) => {
      const newAxisLed = othAxis[name] || ledProps[name];
      ledProps[name] = newAxisLed;
      othAxis[name] = newAxisLed;
      ledSetters[name](newAxisLed);
    });
  }

  function onChangeAxis(axis_name: string): void {
    if(axis_name == 'X' || axis_name == 'Y'){
      [ledProps, othAxis] = changeStates(ledProps, othAxis);
      changeAxis();
    }else{
      coupleAxis();
      saveData();
      axis_name = 'X';
    }
    setAxis(axis_name);
  }

  function bpmAxis(): React.ReactElement[] {
    return bpmGroups.axis.map((name)=>{
      if(axis == name){
        return <S.Select selected={true}>{name}</S.Select>;
      }else{
        return <S.Select selected={false} onClick={() => onChangeAxis(name)}>{name}</S.Select>;
      }
    });
  }

  function groupSelect(groupSelected: string): void{
    let searchString: string;
    if(groupSelected.includes('-')){
      let searchNames = groupSelected.split('-');
      searchString = searchNames[0]+":DI-BPM-"+searchNames[1];
    }else{
      searchString = groupSelected;
    }

    Object.entries(ledProps).map(([name, state]: ArrDictState)=>{
      if(name.includes(searchString)){
        ledSetters[name](!state);
      }
    })
  }

  function findBPM(number: string, name: string): React.ReactElement {
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

  function bpmNumber(): React.ReactElement[] {
    return bpmGroups.bpmNumber.map((number: string)=>{
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

  function bpmTable(): React.ReactElement[] {
    return bpmGroups.bpmName.map((name: string)=>{
      return(
        <S.Row>
          <S.Header
            onClick={() => groupSelect(name)}>
              {name}
          </S.Header>
          {
            bpmGroups.bpmNumber.map((number: string)=>{
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

  function bpmFirst(): React.ReactElement {
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
