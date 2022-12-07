import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart, ChartArea, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';

import ListBPM from "../ListBPM";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { getArchiver } from "../../../controllers/archiver";
import { buildDataset } from "../../../controllers/chart";
import { differentiateData, unsetBPMChange } from "../../../controllers/bpm";
import { changeDateClick } from "../../../controllers/time";

import { optionsDiff } from "./config";
import { DatasetInterface, DatePointInterface } from "../../../assets/interfaces/patterns";
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
    if(keyPressed == event.key){
      onKeyPressed('');
    }
  });

  // Detect click on canvas and update respective date
  async function handleCanvasClick(evt: React.MouseEvent): Promise<void>{
    if(chartRef.current){
      const chart: Chart = chartRef.current.chart[0];
      if(chart != null){
        const chartParameters: ChartArea = chart.chartArea;
        const chartTimeUnit: number = (props.end.getTime() - props.start.getTime())/chartParameters.width;
        const widPoint: number = evt.clientX - chartParameters.left;
        const newRefDate: Date = new Date(chartTimeUnit * widPoint + props.start.getTime());
        changeDateClick(newRefDate, keyPressed);
      }
    }
  }

  // Detect change on time or selected BPMs
  useEffect(() => {
    updateChartDiff();
  }, [props.changeBpm, props.changeTime])

  // Update Difference Chart
  async function updateChartDiff() {
    if(chartRef.current){
      const chart: Chart = chartRef.current.chart[0];
      if(chart != null){
        const datasetList: DatasetList = await buildChartDiff();
        await control.buildChartDatasets(
          chart, datasetList, optionsDiff, 'A');
        unsetBPMChange();
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
          if(datasetCreated == null){
            const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(
              name, props.start, props.end, optimization);
            if(archiverResult != undefined){
              const rawDataset: Array<ArchiverDataPoint> = await buildDataset(archiverResult);
              const finalDataset: Array<DatePointInterface> = await differentiateData(
                rawDataset, name, [props.start, props.end, props.refDate]);
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
        ref={chartRef}/>
      <ListBPM />
      <S.TextWrapper>
        Optimization: <input 
          type='number' 
          value={optimization} 
          onChange={
            (event)=>
              setOptimize(parseInt(event.target.value))}
          max={1500}/>
      </S.TextWrapper>
    </S.ChartWrapper>
  );
};

DiffChart.defaultProps = defaultProps;
export default connect(mapStateToProps)(DiffChart);
