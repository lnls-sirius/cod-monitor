
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Item from "../../Patterns/Item";
import SignatureFilter from "../SignatureFilter";
import { compSignatures } from "../../../controllers/archiver";
import { setSignature } from "../../../controllers/Chart/functions";
import { BaseStrArrayDict, DictState } from "../../../assets/interfaces/patterns";
import { BaseDateInterface } from "../../../assets/interfaces/date";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date} = state.time;
  const {signatures} = state.orbit;

  return {
    start: new Date(start_date),
    end: new Date(end_date),
    sign_list: JSON.parse(signatures)
  }
}

const SignatureComp: React.FC<BaseDateInterface& {sign_list: BaseStrArrayDict}> = (props) => {
  const [compList, setComparison] = useState<Array<any>>([]);
  const [globExp, setGlobExp] = useState<string>('*');
  const [sortState, setSortStates] = useState<[number, boolean]>([0, false]);
  const [filterState, setFilterStates] = useState<DictState>(
    {"C": true, "D": true, "Q": true, "S": true});

  useEffect(() => {
    updateComparisonList();
  }, [props.start, props.end])

  async function updateComparisonList(){
    const simulationResult = await compSignatures(props.start, props.end);
    if(simulationResult != undefined){
      let sortedList: any = [];
      Object.entries(simulationResult).map(
        ([name, property]: [string, [string, number, number]]) => {
          sortedList.push([
            name.substring(0, name.length-1), ...property]);
      });
      sortCompList(sortState[0], sortedList, false);
    }
  }

  function sortCompList(elem: number, rawList?: Array<any>, change?: boolean){
    let sortedList = [];
    let sortOrder = true;

    if(rawList == undefined){
      sortedList = [...compList]
    }else{
      sortedList = [...rawList]
    }

    if(sortState[0] == elem && change == undefined){
      sortOrder = !sortState[1]
    }

    if (elem > 2){
      sortedList.sort(
        (first: any, second: any) => {
          return Math.abs(first[elem]) - Math.abs(second[elem]);
        }
      );
    }else{
      sortedList.sort(
        (first: any, second: any) => {
          return first[elem].localeCompare(second[elem]);
        }
      );
    }
    if (sortOrder){
      sortedList.reverse();
    }
    let states:[number, boolean] = [elem, sortOrder];
    setSortStates(states);
    setComparison(sortedList);
  }

  function showMagnet(readFile: string){
    if(readFile.indexOf("C")>=0){
      console.log(readFile+filterState["C"]+"C")
    }else if(readFile.indexOf("D")>=0 && !filterState["D"]){
      console.log(readFile+filterState["D"]+"D")
    }else if(readFile.indexOf("Q")>=0 && !filterState["Q"]){
      console.log(readFile+filterState["Q"]+"Q")
    }else if(readFile.indexOf("S")>=0 && !filterState["S"]){
      console.log(readFile+filterState["S"]+"S")
    }
  }

  function signToChart(name: string, axis: string, magnet: string): void{
    setSignature(
      name+axis, [name, axis, magnet], props.sign_list);
  }


  function showHeader(){
    return (
      <tr>
        <th><S.Header onClick={() => sortCompList(0)}>Index</S.Header></th>
        <th><S.Header onClick={() => sortCompList(0)}>Element Name</S.Header></th>
        <th><S.Header onClick={() => sortCompList(1)}>Magnet</S.Header></th>
        <th><S.Header onClick={() => sortCompList(2)}>Kick Axis</S.Header></th>
        <th><S.Header onClick={() => sortCompList(3)}>COD X</S.Header></th>
        <th><S.Header onClick={() => sortCompList(4)}>COD Y</S.Header></th>
        <th><S.Header>Add to Chart</S.Header></th>
      </tr>
    );
  }

  function listAllComparisons(){
    var globToRegExp = require('glob-to-regexp');
    let index = 0;
    var reg_exp = globToRegExp(globExp);
    return compList.map((properties: any) => {
      if(properties){
        if(reg_exp.test(properties[0])){
          index += 1;
          return (
            <S.Row>
              <S.Cell>{index}</S.Cell>
              <S.Cell>{properties[0]}</S.Cell>
              <S.Cell>{properties[1]}</S.Cell>
              <S.Cell>{properties[2]}</S.Cell>
              <S.Cell>{properties[3].toFixed(4)}</S.Cell>
              <S.Cell>{properties[4].toFixed(4)}</S.Cell>
              <S.Cell>
                <Item
                  icon='plus'
                  action={()=>signToChart(
                    properties[0], properties[2], properties[1][0])}
                  isSmall={true}/>
              </S.Cell>
            </S.Row>
          );
        }
      }
    });
  }

  return(
    <S.SignatureWrapper>
      <button onClick={()=>showMagnet('C_kickX')}/>
      <SignatureFilter
        setGlobExp={setGlobExp}
        filterState={filterState}
        setFilterStates={setFilterStates} />
      <S.TableWrapper>
        <S.Table>
          {showHeader()}
          {listAllComparisons()}
        </S.Table>
      </S.TableWrapper>
    </S.SignatureWrapper>
  );
};

export default connect(mapStateToProps)(SignatureComp);
