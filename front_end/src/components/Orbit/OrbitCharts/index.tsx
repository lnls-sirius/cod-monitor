import React, { createRef, RefObject, useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';

import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { fetchSignatureOrbit } from "../../../controllers/simulation";
import { buildDatasetOrbit, unsetOrbitChange } from "../../../controllers/orbit";

import { optionsOrbit } from "./config";
import { BaseStrArrayDict, DatasetInterface } from "../../../assets/interfaces/patterns";
import { ChartOrbitInterface, SimulationData } from "../../../assets/interfaces/orbit";
import { ArrDictArrStr } from "../../../assets/interfaces/types";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';
import ListSignatures from "../ListSignatures";

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date, change_time} = state.time;
  const {change_orbit, signatures} = state.orbit;

  return {
    start: new Date(start_date),
    end: new Date(end_date),
    sign_list: JSON.parse(signatures),
    changeTime: change_time,
    changeOrbit: change_orbit
  }
}

const defaultProps: ChartOrbitInterface = {
  start: new Date(),
  end: new Date(),
  sign_list: {},
  changeTime: false,
  changeOrbit: false
}

const OrbitCharts: React.FC<ChartOrbitInterface> = (props) => {
  // Display the charts of the CODX and CODY
  Chart.register(...registerables);
  const chartRef: Array<RefObject<BaseChart>> = [createRef(), createRef()];

  // Detect change on time or selected signatures
  useEffect(() => {
    updateChartOrbit();
  }, [props.changeOrbit, props.changeTime])

  // Update CODX and CODY Chart
  async function updateChartOrbit(): Promise<void>{
    if(chartRef[0].current && chartRef[1].current){
      const chartX: Chart = chartRef[0].current.chart[0];
      const chartY: Chart = chartRef[1].current.chart[1];
      if(chartX != null && chartY != null){
        const datasetList: any = await buildChartOrbit();
        await control.buildChartDatasets(
          chartX, datasetList[0], optionsOrbit);
        await control.buildChartDatasets(
          chartY, datasetList[1], optionsOrbit);
        unsetOrbitChange();
      }
    }
  }

  // Save dataset Orbit
  function saveDataset(name: string, sign_orbit: Array<number>, datasetList: any): any{
    const datasetTemp: any = {
      data: buildDatasetOrbit(sign_orbit),
      xID: 'x',
      label: name
    }
    datasetList.push(datasetTemp);
    return datasetList;
  }

  // Transform Dictionary object to array
  function dictToList(sign_list: BaseStrArrayDict): Array<Array<string>>{
    let signatures: Array<Array<string>> = [];
    let datasets: Array<any> = [];

    Object.entries(sign_list).map(([name, elem_info]: ArrDictArrStr) => {
      if(elem_info[3] === 'true'){
        let datasetCreated: DatasetInterface|null = control.detectNewData(
          name.slice(0, -1) + '- Kick:' + name.slice(-1), props.changeTime);
        console.log(datasetCreated)
        if(datasetCreated == null){
          signatures.push(elem_info);
        }else{
          datasets.push(datasetCreated)
        }
      }
    })
    return [datasets, signatures]
  }

  // Build CODX and CODY Chart
  async function buildChartOrbit(): Promise<Array<any>>{
    let datasetListX: any = []
    let datasetListY: any = []
    const [datasets, signatures_to_read] = dictToList(props.sign_list)
    const dictSign: SimulationData = await fetchSignatureOrbit(
      signatures_to_read, props.start, props.end);
    await Promise.all(
      Object.entries(dictSign).map(async ([name, sign_orbit]: any) => {
        if(name!='cod_rebuilt'){
          name = name.slice(0, -1) + '- Kick:' + name.slice(-1)
        }
        datasetListX = saveDataset(
          name, sign_orbit[0], datasetListX);
        datasetListY = saveDataset(
          name, sign_orbit[1], datasetListY);
      })
    );
    return [datasetListX, datasetListY];
  };


  return(
    <S.ChartWrapper>
      COD X
      <BaseChart
        id={0}
        options={optionsOrbit}
        ref={chartRef[0]}/>
      COD Y
      <BaseChart
        id={1}
        options={optionsOrbit}
        ref={chartRef[1]}/>
      <ListSignatures />
    </S.ChartWrapper>
  );
};

OrbitCharts.defaultProps = defaultProps;
export default connect(mapStateToProps)(OrbitCharts);
