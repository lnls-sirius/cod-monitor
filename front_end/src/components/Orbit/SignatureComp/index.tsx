
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Item from "../../Patterns/Item";
import SignatureFilter from "../SignatureFilter";
import GestureRecognizer from "../../Patterns/GestureRecognizer";

import { getSignatures } from "../../../controllers/archiver";
import { deleteSignature, unsetOrbitChange, setOrbitChange, setSignature } from "../../../controllers/orbit";
import { sortList } from "../../../controllers/patterns";
import { DictState } from "../../../assets/interfaces/patterns";
import { OrbitChartInterface, SignData } from "../../../assets/interfaces/orbit";
import { DictOrbitData, OrbitData } from "../../../assets/interfaces/types";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';


function mapStateToProps(state: StoreInterface){
  const {start_date, end_date, change_time} = state.time;
  const {signatures} = state.orbit;

  return {
    start: new Date(start_date),
    end: new Date(end_date),
    sign_list: JSON.parse(signatures),
    changeTime: change_time
  }
}

const defaultProps = {
  start: new Date(),
  end: new Date(),
  sign_list: {},
  changeTime: false
}

const SignatureComp: React.FC<OrbitChartInterface> = (props) => {
  // Display the list of signatures
  const [compList, setComparison] = useState<Array<OrbitData>>([]);
  const [globExp, setGlobExp] = useState<string>('*');
  const [sortState, setSortStates] = useState<[number, boolean]>([0, false]);
  const [filterState, setFilterStates] = useState<DictState>({
    C: true, D: true, Q: true, S: true, X: true, Y: true, chart: false});

  // Detect change on the interval time
  useEffect(() => {
    updateComparisonList();
  }, [props.changeTime])

  function handleActSign(properties: Array<OrbitData>): void {
    properties.map((orbit_data: OrbitData)=>{
      let id_name: string = orbit_data[0]+orbit_data[2];
      let inChart: boolean = id_name in props.sign_list;
      actionSignature(orbit_data, inChart);
    })
  }

  // Update the list of signatures
  async function updateComparisonList(): Promise<void> {
    const simulationResult: SignData|undefined = await getSignatures(props.start, props.end);
    if(simulationResult !== undefined){
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
    setOrbitChange();

    if(rawList === undefined){
      sortedList = [...compList]
    }else{
      sortedList = [...rawList]
    }

    if(sortState[0] === elem && change === undefined){
      sortOrder = !sortState[1]
    }

    sortedList = sortList(sortedList, elem);
    if (sortOrder){
      sortedList.reverse();
    }
    states = [elem, sortOrder];
    setSortStates(states);
    setComparison(sortedList);
    unsetOrbitChange();
  }

  // Filter Magnets by type
  function showMagnet(readFile: string): boolean {
    if(readFile.indexOf("C")>=0 && !filterState.C){
      return false;
    }else if(readFile.indexOf("D")>=0 && !filterState.D){
      return false;
    }else if(readFile.indexOf("Q")>=0 && !filterState.Q){
      return false;
    }else if(readFile.indexOf("S")>=0 && !filterState.S){
      return false;
    }
    return true;
  }

  // Filter Magnets by kick axis
  function showAxis(axis: string): boolean {
    if(axis === 'X' && filterState.X){
      return true;
    }else if(axis === 'Y' && filterState.Y){
      return true;
    }
    return false;
  }

  // Filter Magnets if it is selected
  function showInChart(name: string): boolean {
    if(name in props.sign_list && filterState.chart){
      return true;
    }else if(!filterState.chart){
      return true;
    }
    return false;
  }

  // Add Signature to Chart
  function signToChart(properties: OrbitData): void {
    const name: string = properties[0];
    const axis: string = properties[2];
    const magnet: string = properties[1][0];
    let neg_corr: string[] = ['false', 'false'];

    if(properties[3] < 0){
      neg_corr[0] = 'true';
    }
    if(properties[4] < 0){
      neg_corr[1] = 'true';
    }
    const a: string[] = [name, axis, magnet, 'true'].concat(neg_corr);

    setSignature(
      name+axis, a, props.sign_list);
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

  // Action on click in the signature row
  function actionSignature(properties: OrbitData, inChart: boolean){
    if(!inChart){
      signToChart(properties)
    }else{
      deleteSignature(
        properties[0]+properties[2], props.sign_list)
    }
  }

  // Show add to chart button
  function showAddToChart(properties: OrbitData, inChart: boolean): React.ReactElement{
    if(!inChart){
      return(
        <td>
          <Item
            icon='plus'
            action={()=>actionSignature(properties, inChart)}
            stateActive={false}
            isSmall={true}
            tooltip={
              "Add Signature "+properties[0]+" to Chart"}/>
        </td>);
    }
    return (
      <td>
        <Item
          icon='trash'
          isSmall={true}
          stateActive={false}
          action={() => actionSignature(properties, inChart)}
          tooltip={
            "Remove Signature "+properties[0]+" from Chart"}/>
        </td>
    );
  }

  // Show one Signature information (one row)
  function showSignature(index: number, properties: OrbitData): React.ReactElement{
    let id_name: string = properties[0]+properties[2];
    let inChart: boolean = id_name in props.sign_list;
    return (
      <S.Row
          key={id_name}
          inChart={inChart}
          onClick={()=>actionSignature(properties, inChart)}>
        <td>{index}</td>
        <td>{properties[0]}</td>
        <td>{properties[1]}</td>
        <td>{properties[2]}</td>
        <td>{properties[3].toFixed(4)}</td>
        <td>{properties[4].toFixed(4)}</td>
        {showAddToChart(properties, inChart)}
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
          if(showMagnet(properties[1]) && showAxis(properties[2]) &&
              showInChart(properties[0]+properties[2])){
            index += 1;
            return showSignature(index, properties);
          }
        }
      }
    });
  }

  return(
    <GestureRecognizer
        type="row"
        gestureHandler={handleActSign}>
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
    </GestureRecognizer>
  );
};

SignatureComp.defaultProps = defaultProps;
export default connect(mapStateToProps)(SignatureComp);
