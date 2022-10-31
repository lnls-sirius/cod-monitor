import React, { useState } from "react";

import BPMLed from "../BPMLed";
import { changeStates } from "../../../controllers/Patterns/functions";
import { saveBPMList } from "../../../controllers/Chart/functions";
import { bpmGroups } from "../../../assets/bpms/groups";
import { DictState, SetterDictState } from "../../../assets/interfaces/patterns";
import { ArrDictState, DispatchBool } from "../../../assets/interfaces/types";

import * as S from './styled';


const AddBPM: React.FC = () => {
  // Display the component for the selection of BPMs
  const [axis, setAxis] = useState<string>('X');
  const [ledSetters, setLedSetters] = useState<SetterDictState>({});
  let othAxis: DictState = {};
  let ledProps: DictState = {};

  // Save details to alter one led state and of its state
  function onChildMount(setter: DispatchBool, id: string): void {
    let setterList = ledSetters;
    setterList[id] = setter;
    setLedSetters(setterList);
  };

  // Alter the state of one led
  function onChildUpdate(state: boolean, id: string): void {
    ledProps[id] = state;
    saveBPMList(ledProps, othAxis, axis);
  }

  // Alter the states of all the leds
  function changeAxis(): void {
    Object.entries(ledProps).map(([name, prop]: ArrDictState) => {
      ledSetters[name](prop);
    });
  }

  // Do an AND operation with both axis
  function coupleAxis(): void {
    Object.keys(ledProps).map(async (name: string) => {
      const newAxisLed = othAxis[name] || ledProps[name];
      ledProps[name] = newAxisLed;
      othAxis[name] = newAxisLed;
      ledSetters[name](newAxisLed);
    });
  }

  // Change led selection axis
  function onChangeAxis(axis_name: string): void {
    if(axis_name == 'X' || axis_name == 'Y'){
      [ledProps, othAxis] = changeStates(ledProps, othAxis);
      changeAxis();
    }else{
      coupleAxis();
      saveBPMList(ledProps, othAxis, axis);
      axis_name = 'X';
    }
    setAxis(axis_name);
  }

  // Select a BPM group
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

  // Show BPM selection by element name
  function bpmAxis(): React.ReactElement[] {
    return bpmGroups.axis.map((name)=>{
      return (
        <S.Select
          key={name}
          selected={(axis == name)}
          onClick={() => onChangeAxis(name)}>
            {name}
        </S.Select>);
    });
  }

  // Show BPM selection by the storage ring's section
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

  // Display one BPM Led
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
      ledProps={ledProps}
      othAxis={othAxis}
      mountData={onChildMount}
      updateData={onChildUpdate}/>;
  }

  // Build the BPM table with all the headers and leds
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

  // Add the BPM 01M1 to the last line
  function bpmFirst(): React.ReactElement {
    const name = bpmGroups.bpmName[0];
    const number = bpmGroups.bpmNumber[0];
    return(
      <S.Row>
        <S.Header
          onClick={() => groupSelect(name)}>
            {name}
        </S.Header>
        <S.Column>
          {findBPM(number, name)}
        </S.Column>
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
