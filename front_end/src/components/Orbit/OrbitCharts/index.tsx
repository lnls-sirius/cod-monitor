import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import ListSignatures from "../ListSignatures";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { fetchSignatureOrbit } from "../../../controllers/simulation";
import { buildDatasetOrbit, unsetOrbitChange } from "../../../controllers/orbit";

import { optionsOrbit } from "./config";
import { bpm_labels } from "../../../assets/constants/pos";
import { BaseStrArrayDict, DatasetInterface } from "../../../assets/interfaces/patterns";
import { ChartOrbitInterface, SignChartData } from "../../../assets/interfaces/orbit";
import { ArrDictArrStr, DatasetList } from "../../../assets/interfaces/types";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

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
  const chartRef: Array<any> = [useRef(), useRef()];
  Chart.register(...registerables);
  Chart.register(zoomPlugin);

  // Detect change on time or selected signatures
  useEffect(() => {
    if(props.changeOrbit || props.changeTime){
      updateChartOrbit();
    }
  }, [props.changeOrbit, props.changeTime])

  // Update CODX and CODY Chart
  async function updateChartOrbit(): Promise<void>{
    if(chartRef[0].current && chartRef[1].current){
      const chartX: null|Chart = chartRef[0].current.chart;
      const chartY: null|Chart = chartRef[1].current.chart;
      if(chartX !== null && chartY !== null){
        const datasetList: Array<DatasetList> = await buildChartOrbit();
        control.setLabels(bpm_labels)
        await control.buildChartDatasets(
          chartX, datasetList[0], optionsOrbit, 'X');
        control.setDataset(datasetList[0], 'X');
        await control.buildChartDatasets(
          chartY, datasetList[1], optionsOrbit, 'Y');
        control.setDataset(datasetList[1], 'Y')
        unsetOrbitChange();
      }
    }
  }

  // Save dataset Orbit
  function saveDataset(
      name: string, sign_orbit: Array<number>,
      datasetList: DatasetList): DatasetList{
    const datasetTemp: DatasetInterface = {
      data: buildDatasetOrbit(sign_orbit),
      xAxisID: 'x',
      label: name
    }
    datasetList.push(datasetTemp);
    return datasetList;
  }

  // Transform Dictionary object to array
  function dictToList(sign_list: BaseStrArrayDict): [Array<DatasetInterface[]>,Array<Array<string>>]{
    let signatures: Array<Array<string>> = [];
    let datasets: Array<DatasetInterface[]> = [];

    let datasetX: DatasetInterface|null = control.detectNewData(
      'cod_rebuilt', props.changeTime, 'X');
    let datasetY: DatasetInterface|null = control.detectNewData(
      'cod_rebuilt', props.changeTime, 'Y');
    if(datasetX === null || datasetY === null ||
        datasetX === undefined || datasetY === undefined){
      signatures.push(['cod_rebuilt']);
    }else{
      datasets.push([datasetX, datasetY])
    }

    Object.entries(sign_list).map(([name, elem_info]: ArrDictArrStr) => {
      if(elem_info[3] === 'true'){
        const sign_label = name.slice(0, -1) + '- Kick:' + name.slice(-1);
        let datasetX: DatasetInterface|null = control.detectNewData(
          sign_label, props.changeTime, 'X');
        let datasetY: DatasetInterface|null = control.detectNewData(
          sign_label, props.changeTime, 'Y');
        if(datasetX === null || datasetY === null){
          signatures.push(elem_info);
        }else{
          datasets.push([datasetX, datasetY])
        }
      }
    })
    return [datasets, signatures]
  }

  // Build CODX and CODY Chart
  async function buildChartOrbit(): Promise<Array<DatasetList>>{
    let datasetListX: DatasetList = []
    let datasetListY: DatasetList = []

    const [signatures_created, signatures_to_read] = dictToList(props.sign_list);
    if(signatures_to_read.length > 0){
      const dictSign: SignChartData = await fetchSignatureOrbit(
        signatures_to_read, props.start, props.end);
      Object.entries(dictSign).map(([name, sign_orbit]: [string, Array<Array<number>>]) => {
        if(name!=='cod_rebuilt'){
          name = name.slice(0, -1) + '- Kick:' + name.slice(-1)
        }
        datasetListX = saveDataset(
          name, sign_orbit[0], datasetListX);
        datasetListY = saveDataset(
          name, sign_orbit[1], datasetListY);
      });
    }
    signatures_created.map((dataset: DatasetInterface[]) => {
      datasetListX.push(dataset[0]);
      datasetListY.push(dataset[1]);
    });
    return [datasetListX, datasetListY];
  };

  return(
    <S.ChartWrapper>
      COD X
      <BaseChart
        id={0}
        options={optionsOrbit}
        data={control.getDatasetByIdx(0)}
        ref={chartRef[0]}/>
      COD Y
      <BaseChart
        id={1}
        options={optionsOrbit}
        data={control.getDatasetByIdx(1)}
        ref={chartRef[1]}/>
      <ListSignatures />
    </S.ChartWrapper>
  );
};

OrbitCharts.defaultProps = defaultProps;
export default connect(mapStateToProps)(OrbitCharts);
