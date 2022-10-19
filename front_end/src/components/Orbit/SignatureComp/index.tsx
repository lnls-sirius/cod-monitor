import { faC, faChartLine, faD, faQ, faS } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { compSignatures } from "../../../controllers/archiver";
import { BaseDateInterface } from "../../../controllers/Time/interfaces";
import { StoreInterface } from "../../../redux/storage/store";
import Item from "../../Patterns/Item";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date} = state.time;
  return {
    start: new Date(start_date),
    end: new Date(end_date)
  }
}

const SignatureComp: React.FC<BaseDateInterface> = (props) => {
  const [compList, setComparison] = useState<Array<any>>([]);
  const [nameFilter, setNameFilter] = useState<string>('');
  const [sortState, setSortStates] = useState<Array<boolean>>(
    [false, false, false, false]);
  const [filterState, setFilterStates] = useState<Array<boolean>>(
    [true, true, true, true]);

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
      setComparison(sortedList);
    }
  }

  function sortCompList(elem: number){
    let sortedList = [...compList]
    if (elem > 2){
      sortedList.sort(
        (first: any, second: any) => {
          return first[elem] - second[elem];
        }
      );
    }else{
      sortedList.sort(
        (first: any, second: any) => {
          return first[elem].localeCompare(second[elem]);
        }
      );
    }
    if (sortState[elem]){
      sortedList.reverse();
    }
    let states = [...sortState];
    states[elem] = !sortState[elem];
    setSortStates(states);
    setComparison(sortedList);
  }

  function filterMagnet(magnet: number){
    let magnetStates = [...filterState];
    magnetStates[magnet] = !magnetStates[magnet];
    setFilterStates(magnetStates);
  }

  function showMagnet(readFile: string): boolean{
    if(readFile.indexOf("C")>=0 && !filterState[0]){
      return false;
    }else if(readFile.indexOf("D")>=0 && !filterState[1]){
      return false;
    }else if(readFile.indexOf("Q")>=0 && !filterState[2]){
      return false;
    }else if(readFile.indexOf("S")>=0 && !filterState[3]){
      return false;
    }
    return true;
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
        <th><S.Header>Chart</S.Header></th>
      </tr>
    );
  }

  function listAllComparisons(){
    let index = 0;
    return compList.map((properties: any) => {
      if(properties){
        if(showMagnet(properties[1])){
          if(properties[0].indexOf(nameFilter)>=0 || nameFilter == ''){
            index += 1;
            return (
              <S.Row>
                <S.Cell>{index}</S.Cell>
                <S.Cell>{properties[0]}</S.Cell>
                <S.Cell>{properties[1]}</S.Cell>
                <S.Cell>{properties[2]}</S.Cell>
                <S.Cell>{properties[3]}</S.Cell>
                <S.Cell>{properties[4]}</S.Cell>
                <S.Cell>
                  <Item
                    icon={faChartLine}
                    action={()=>null}
                    stateActive={true}
                    isSmall={true}/>
                </S.Cell>
              </S.Row>
            );
          }
        }
      }
    });
  }

  return(
    <S.SignatureWrapper>
      <S.Filter>
        Filter:
          <S.NameFilter type='text'
            value={nameFilter}
            onChange={(event)=>setNameFilter(
              event.target.value.toUpperCase())}/>
          <Item
            icon={faC}
            action={()=>filterMagnet(0)}
            stateActive={true}/>
          <Item
            icon={faD}
            action={()=>filterMagnet(1)}
            stateActive={true}/>
          <Item
            icon={faQ}
            action={()=>filterMagnet(2)}
            stateActive={true}/>
          <Item
            icon={faS}
            action={()=>filterMagnet(3)}
            stateActive={true}/>
      </S.Filter>
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
