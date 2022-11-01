
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Item from "../../Patterns/Item";
import SignatureFilter from "../SignatureFilter";
import { compSignatures } from "../../../controllers/archiver";
import { setSignature } from "../../../controllers/Chart/functions";
import { sortList } from "../../../controllers/Patterns/functions";
import { DictState } from "../../../assets/interfaces/patterns";
import { OrbitChartInterface, SimulationData } from "../../../assets/interfaces/orbit";
import { DictOrbitData, OrbitData } from "../../../assets/interfaces/types";
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

const defaultProps = {
  start: new Date(),
  end: new Date(),
  sign_list: {}
}

const SignatureComp: React.FC<OrbitChartInterface> = (props) => {
  // Display the list of signatures
  const [compList, setComparison] = useState<Array<OrbitData>>([]);
  const [globExp, setGlobExp] = useState<string>('*');
  const [sortState, setSortStates] = useState<[number, boolean]>([0, false]);
  const [filterState, setFilterStates] = useState<DictState>({
    C: false, D: false, Q: false, S: false});

  // Detect change on the interval time
  useEffect(() => {
    updateComparisonList();
  }, [props.start, props.end])

  // Update the list of signatures
  async function updateComparisonList(): Promise<void> {
    const simulationResult: SimulationData|undefined = await compSignatures(props.start, props.end);
    if(simulationResult != undefined){
      let sortedList: Array<OrbitData> = [];
      Object.entries(simulationResult).map(
        ([name, property]: [string, DictOrbitData]) => {
          sortedList.push([
            name.substring(0, name.length-1), ...property]);
      });
      sortCompList(sortState[0], sortedList, false);
    }
  }

  // Sort the list of signatures with strings or numbers and save the sorted list
  function sortCompList(elem: number, rawList?: Array<OrbitData>, change?: boolean): void {
    let sortedList: Array<OrbitData> = [];
    let sortOrder: boolean = true;
    let states:[number, boolean] = [elem, sortOrder];

    if(rawList == undefined){
      sortedList = [...compList]
    }else{
      sortedList = [...rawList]
    }

    if(sortState[0] == elem && change == undefined){
      sortOrder = !sortState[1]
    }

    sortedList = sortList(sortedList, elem);
    if (sortOrder){
      sortedList.reverse();
    }
    states = [elem, sortOrder];
    setSortStates(states);
    setComparison(sortedList);
  }

  // Filter Magnets by type
  function showMagnet(readFile: string): boolean {
    if(readFile.indexOf("C")>=0 && filterState.C){
      return false;
    }else if(readFile.indexOf("D")>=0 && filterState.D){
      return false;
    }else if(readFile.indexOf("Q")>=0 && filterState.Q){
      return false;
    }else if(readFile.indexOf("S")>=0 && filterState.S){
      return false;
    }
    return true;
  }

  // Add Signature to Chart
  function signToChart(name: string, axis: string, magnet: string): void {
    setSignature(
      name+axis, [name, axis, magnet], props.sign_list);
  }

  // Show list head with Sort Buttons
  function showHeader(): React.ReactElement{
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

  // Show one Signature information (one row)
  function showSignature(index: number, properties: OrbitData): React.ReactElement{
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

  // List all Signatures applying the filters
  function listAllComparisons(): (React.ReactElement | undefined)[]{
    let globToRegExp: NodeRequire = require('glob-to-regexp');
    let index: number = 0;
    let reg_exp: any = globToRegExp(globExp);
    return compList.map((properties: any) => {
      if(properties){
        if(reg_exp.test(properties[0])){
          if(showMagnet(properties[1])){
            index += 1;
            return showSignature(index, properties);
          }
        }
      }
    });
  }

  return(
    <S.SignatureWrapper>
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

SignatureComp.defaultProps = defaultProps;
export default connect(mapStateToProps)(SignatureComp);
