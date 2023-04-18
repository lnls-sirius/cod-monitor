import React, { useState } from "react";

import BPMLed from "../BPMLed";
import Tooltip from "../../Patterns/Tooltip";
import GestureRecognizer from "../../Patterns/GestureRecognizer";
import { changeStates } from "../../../controllers/patterns";
import { buildBPMName, getSectionAndName, saveBPMList } from "../../../controllers/bpm";
import { bpmGroups } from "../../../assets/constants/patterns";
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
    let setterList: SetterDictState = ledSetters;
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
    if(axis_name === 'X' || axis_name === 'Y'){
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
    let searchString: Array<string> = [];
    let type: string = '';
    if(groupSelected.includes('-')){
      let searchNames: Array<string> = groupSelected.split('-');
      type = searchNames[1];
      if(groupSelected.includes('SA/SB/SP')){
        searchString = searchNames[0].split('/');
      }else{
        searchString.push(searchNames[0]);
      }
    }else{
      searchString.push(groupSelected);
    }


    Object.entries(ledProps).map(([name, state]: ArrDictState)=>{
      let corr_type: boolean = true;
      if(type !== ''){
        corr_type = name.includes('BPM-'+type)
      }
      if(searchString.some((string) => name.includes(string))
        && corr_type){
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
          state={(axis === name)}
          onClick={() => onChangeAxis(name)}>
            {name}
        </S.Select>);
    });
  }

  // Show BPM selection by the storage ring's section
  function bpmNumber(): React.ReactElement[] {
    return bpmGroups.bpmNumber.map((number: string)=>{
      return(
        <td>
          <Tooltip
              text={"Select all the BPMs in the section "+number}
              movable={true}>
            <S.Header
              onClick={() => groupSelect(number)}>
                {number}
            </S.Header>
          </Tooltip>
        </td>
      )
    })
  }

  // Display one BPM Led
  function findBPM(number: string, name: string): React.ReactElement {
    let bpmName: string= buildBPMName(number, name)

    return (
      <Tooltip
          text={bpmName}
          movable={true}>
        <BPMLed
          key={bpmName}
          id={bpmName}
          axis={axis}
          ledProps={ledProps}
          othAxis={othAxis}
          mountData={onChildMount}
          updateData={onChildUpdate}/>
      </Tooltip>
    );
  }

  // Get BPM from the IDs
  function idsBPMs(type: string, group: Array<string>): React.ReactElement[] {
    return group.map((s_name: string)=>{
      if(s_name!==''){
        return <td>{
          findBPM(
            s_name.substring(0,2),
            s_name.substring(2,4)+type)}
        </td>
      }
      return <td/>
    });
  }

  // Show BPM sections
  function showColumns(name: string): React.ReactElement[]{
    if(name.includes('SA/SB/SP')){
      let group: Array<string>;
      if(name.includes('-1')){
        return idsBPMs('-1', bpmGroups.s1);
      }else{
        return idsBPMs('-2', bpmGroups.s2);
      }
    }
    return bpmGroups.bpmNumber.map((number: string)=>{
      if((number==='01') && name==='M1'){
        return <td></td>
      }else{
        return <td>{findBPM(number, name)}</td>
      }
    })
  }

  // Build the BPM table with all the headers and leds
  function bpmTable(): React.ReactElement[] {
    return bpmGroups.bpmName.map((name: string)=>{
      return(
        <tr>
          <Tooltip
              text={"Select the BPM "+name+" in all sections"}
              movable={true}>
            <S.Header
              onClick={() => groupSelect(name)}>
                {name}
            </S.Header>
          </Tooltip>
          {showColumns(name)}
        </tr>
      )
    })
  }

  // Add the BPM 01M1 to the last line
  function bpmFirst(): React.ReactElement {
    const name = 'M1';
    const number = bpmGroups.bpmNumber[0];
    return(
      <tr>
        <Tooltip
            text={"Select the BPM "+name+" in all sections"}
            movable={true}>
          <S.Header
            onClick={() => groupSelect(name)}>
              {name}
          </S.Header>
        </Tooltip>
        <td>
          {findBPM(number, name)}
        </td>
      </tr>
    )
  }

  // Handle multi BPM selection
  function handlePan(bpm_interval: Array<string>): void {
    const sectionList: Array<string> = bpmGroups.bpmNumber;
    const nameList: Array<string> = bpmGroups.bpmName;
    const [secIni, nameIni] = getSectionAndName(bpm_interval[0])
    const [secEnd, nameEnd] = getSectionAndName(bpm_interval[1])
    let indexes: Array<Array<number>> = [
      [sectionList.indexOf(secIni), sectionList.indexOf(secEnd)],
      [nameList.indexOf(nameIni), nameList.indexOf(nameEnd)]];
    for(let idx = 0; idx < indexes.length; idx++) {
      if(indexes[idx][0] > indexes[idx][1]){
        [indexes[idx][0], indexes[idx][1]] = changeStates(
          indexes[idx][0], indexes[idx][1]);
      }
    }
    for(
      let counterSect = indexes[0][0];
      counterSect <= indexes[0][1];
      counterSect++){
        for(
          let counterName = indexes[1][0];
          counterName <= indexes[1][1];
          counterName++){
            const bpm_name: string = buildBPMName(
              sectionList[counterSect], nameList[counterName]);
            ledSetters[bpm_name](!ledProps[bpm_name]);
        }
    }
  }

  return(
    <GestureRecognizer
        type="element"
        gestureHandler={(bpm_interval: Array<string>)=>handlePan(bpm_interval)}>
      <S.Table id="add_bpm_table">
        {bpmAxis()}
        {bpmNumber()}
        {bpmTable()}
        {bpmFirst()}
      </S.Table>
    </GestureRecognizer>
  );
};

export default AddBPM;
