import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart, ChartArea, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import ListBPM from "../ListBPM";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { getArchiver } from "../../../controllers/archiver";
import { differentiateData, setBPMChange } from "../../../controllers/bpm";
import { changeDateClick } from "../../../controllers/time";

import { optionsDiff } from "./config";
import { DatasetInterface} from "../../../assets/interfaces/patterns";
import { ChartDiffProperties } from "../../../assets/interfaces/bpm";
import { DatasetList } from "../../../assets/interfaces/types";
import { ArchiverDataPoint } from "../../../assets/interfaces/data_access";
import { StoreInterface } from "../../../redux/storage/store";
import * as S from './styled';

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date, ref_date, change_time} = state.time;
  const {bpm_list, change_bpm} = state.bpm;

  return {
    state_list: JSON.parse(bpm_list),
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(ref_date),
    changeBpm: change_bpm,
    changeTime: change_time
  }
}

const defaultProps: ChartDiffProperties = {
  state_list: {},
  start: new Date(),
  end: new Date(),
  refDate: new Date(),
  changeBpm: false,
  changeTime: false
}

const DiffChart: React.FC<ChartDiffProperties> = (props) => {
  // Display the chart of the BPM Drift
  const [keyPressed, onKeyPressed] = useState<string>('');
  const [optimization, setOptimize] = useState<number>(800);
  const [optimizeFlag, setOptimizeFlag] = useState<boolean>(false);
  const chartRef: React.RefObject<BaseChart> = createRef();
  Chart.register(...registerables);
  Chart.register(zoomPlugin);

  // Detect and register key pressed
  window.addEventListener('keydown', (event) => {
    if (event.repeat){
      return;
    }
    onKeyPressed(event.key);
  });

  // Detect and register key released
  window.addEventListener('keyup', (event) => {
    if (event.repeat){
      return;
    }
    if(keyPressed === event.key){
      onKeyPressed('');
    }
  });

  // Detect click on canvas and update respective date
  async function handleCanvasClick(evt: React.MouseEvent): Promise<void>{
    if(chartRef.current){
      const chart: null|Chart = chartRef.current.chart;
      if(chart !== null){
        const chartParameters: ChartArea = chart.chartArea;
        const chartRange: any = chart.scales.x.getMinMax(false);
        const chartTimeUnit: number = (chartRange.max - chartRange.min)/chartParameters.width;
        const widPoint: number = evt.clientX - chartParameters.left;
        const newRefDate: Date = new Date(chartTimeUnit * widPoint + chartRange.min);
        changeDateClick(newRefDate, keyPressed);
      }
    }
  }

  // Detect change on time or selected BPMs
  useEffect(() => {
    if(props.changeBpm || props.changeTime || optimizeFlag){
      updateChartDiff();
      setOptimizeFlag(false);
    }
  }, [props.changeBpm, props.changeTime, optimizeFlag])

  // Update Difference Chart
  async function updateChartDiff() {
    if(chartRef.current){
      const chart: null|Chart = chartRef.current.chart;
      if(chart !== null){
        const datasetList: DatasetList = await buildChartDiff();
        control.setLabels([]);
        await control.buildChartDatasets(
          chart, datasetList, optionsDiff, 'A');
      }
    }
  }

  // Build difference Chart
  async function buildChartDiff(): Promise<DatasetList> {
    let datasetList: DatasetList = [];
    await Promise.all(
      Object.entries(props.state_list).map(async ([name, state]) => {
        if(state[0] && state[1]){
          let datasetCreated: DatasetInterface|null = control.detectNewData(
            name, props.changeTime, 'A');
          if(datasetCreated === null || !(props.changeBpm || props.changeTime)){
            const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
              name, props.start, props.end, optimization);
            if(archiverResult !== undefined){
              const finalDataset: Array<ArchiverDataPoint> = await differentiateData(
                archiverResult, name, [props.start, props.end, props.refDate]);
              const datasetTemp: DatasetInterface = {
                data: finalDataset,
                xAxisID: 'x',
                label: name
              }
              datasetList.push(datasetTemp);
            }
          }else{
            datasetList.push(datasetCreated);
          }
        }
      })
    );
    return datasetList;
  };

  return(
    <S.ChartWrapper
      onClick={handleCanvasClick}>
      <BaseChart
        id={0}
        options={optionsDiff}
        data={control.getDatasetByIdx(0)}
        ref={chartRef}
        />
      <ListBPM />
      {/* <S.TextWrapper>
        Number of Points: <input
          type='number'
          value={optimization}
          onChange={
            (event)=>
              setOptimize(parseInt(event.target.value))}
          onKeyDown={
            (event)=>{
              if(event.key === 'Enter'){
                setBPMChange();
                setOptimizeFlag(true);
              }
            }
          }
          max={1500}/>
      </S.TextWrapper> */}
    </S.ChartWrapper>
  );
};

DiffChart.defaultProps = defaultProps;
export default connect(mapStateToProps)(DiffChart);
