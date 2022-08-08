import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bpmGroups } from "../../assets/bpms/groups";
import { BpmDispatcher } from "../../redux/dispatcher";
import { StoreInterface } from "../../redux/storage/store";
import Led from "../Patterns/Led";
import * as S from './styled';

const AddBPM: React.FC = () => {
  const listLeds = useSelector((state: StoreInterface) => state.bpm.list);
  const [axis, setAxis]: any = useState('X');
  const [oldAxis, setOldAxis]: any = useState('X');
  // let othAxis: any = {};
  let ledProps: any = JSON.parse(listLeds);

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

  function getLedState(bpm_name: string) {
    if (Object.keys(ledProps).length === 0 || ledProps[bpm_name] == undefined) {
      return false;
    }else{
      return ledProps[bpm_name];
    }
  }

  function saveData(){
    let ledsList: {[key: string]: boolean} = {};
    Object.entries(ledProps).map(([name, prop]: any) => {
      ledsList[getName(name, false)] = prop.state;
      ledsList[getName(name, true)] = false;//othAxis[name].state;
      ledsList[name] = prop.setState;
    });
    console.log(ledProps)
    BpmDispatcher.setBpmList(JSON.stringify(ledsList));
  }

  // useEffect(() => {
  //   if(oldAxis != axis){
  //     saveData();
  //     if(axis == 'X'){
  //       let extraAxis = othAxis;
  //       othAxis = ledProps;
  //       ledProps = extraAxis;
  //       onChangeAxis();
  //     }else if(axis == 'Y'){
  //       let extraAxis = ledProps;
  //       ledProps = othAxis;
  //       othAxis = extraAxis;
  //       onChangeAxis();
  //     }else{
  //       coupleAxis();
  //       setAxis('X');
  //     }
  //     setOldAxis(axis);
  //   }
  // },[axis]);

  const onChildMount = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, id: string) => {
    ledProps[id] = {
      'state': false,
      'setState': setFunction
    }
    // othAxis[id] = {
    //   'state': getLedState(getName(id, true)),
    //   'setState': setFunction
    // }
  };

  const onChildUpdate = (state: boolean, id: string) => {
    try{
      ledProps[id].state = state;
      saveData();
    }catch(e){
      console.log(e);
    }
  }

  // function coupleAxis(){
  //   Object.entries(ledProps).map(async ([name, prop]: any) => {
  //     const newAxisLed = getLedState(getName(name, false)) || getLedState(getName(name, true));
  //     prop.state = newAxisLed;
  //     othAxis[name].state = newAxisLed;
  //     prop['setState'](newAxisLed);
  //   });
  // }

  // function onChangeAxis(){
  //   Object.entries(ledProps).map(async ([name, prop]: any) => {
  //     const newAxisLed = getLedState(getName(name, false));
  //     prop['setState'](newAxisLed);
  //     prop.state = newAxisLed;
  //   });
  // }

  // function bpmAxis(){
  //   return bpmGroups.axis.map((name)=>{
  //     if(axis == name){
  //       return <S.Select selected={true}>{name}</S.Select>;
  //     }else{
  //       return <S.Select selected={false} onClick={() => setAxis(name)}>{name}</S.Select>;
  //     }
  //   });
  // }

  // function groupSelect(groupSelected: string){
  //   let searchString: string;
  //   if(groupSelected.includes('-')){
  //     let searchNames = groupSelected.split('-');
  //     searchString = searchNames[0]+":DI-BPM-"+searchNames[1];
  //   }else{
  //     searchString = groupSelected;
  //   }
  //   Object.keys(ledProps).map((name: any)=>{
  //     if(name.includes(searchString)){
  //       let ledState = ledProps[name];
  //       ledState['setState'](!ledState.state);
  //     }
  //   })
  // }

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
            updateData={onChildUpdate}
            initState={state}/>;
  }

  function bpmNumber(){
    return bpmGroups.bpmNumber.map((number: any)=>{
      return(
        <S.Column>
          {/* <S.Header
            onClick={() => groupSelect(number)}>
              {number}
          </S.Header> */}
        </S.Column>
      )
    })
  }

  function bpmTable(){
    return bpmGroups.bpmName.map((name: any)=>{
      return(
        <S.Row>
          {/* <S.Header
            onClick={() => groupSelect(name)}>
              {name}
          </S.Header> */}
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
        {/* <S.Header
          onClick={() => groupSelect(name)}>
            {name}
        </S.Header> */}
        <S.Column>{findBPM(number, name)}</S.Column>
      </S.Row>
    )
  }

  return(
    <S.Table>
      {/* {bpmAxis()} */}
      {bpmNumber()}
      {bpmTable()}
      {bpmFirst()}
    </S.Table>
  );
};

export default AddBPM;
