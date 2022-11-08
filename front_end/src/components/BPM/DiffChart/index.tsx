import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart, ChartArea, registerables } from 'chart.js';

import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { getArchiver } from "../../../controllers/archiver";
import { buildDataset } from "../../../controllers/chart";
import { differentiateData, unsetBPMChange } from "../../../controllers/bpm";
import { changeDateClick } from "../../../controllers/time";

import { optionsDiff } from "./config";
import { DatePointInterface } from "../../../assets/interfaces/patterns";
import { ChartDiffProperties } from "../../../assets/interfaces/bpm";
import { ArchiverDataPoint } from "../../../data-access/interface";
import { StoreInterface } from "../../../redux/storage/store";

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
  const chartRef: React.RefObject<BaseChart> = createRef();
  Chart.register(...registerables);

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
        const datasetList: any = await buildChartDiff();
        await control.buildChartDatasets(
          chart, datasetList, optionsDiff);
        unsetBPMChange();
      }
    }
  }

  // Build difference Chart
  async function buildChartDiff(){
    let datasetList: any = [];
    await Promise.all(
      Object.entries(props.state_list).map(async ([name, state]) => {
        if(state[0] && state[1]){
          const archiverResult: ArchiverDataPoint[]|undefined = await getArchiver(name, props.start, props.end, 800);
          if(archiverResult != undefined){
            const rawDataset: Array<ArchiverDataPoint> = await buildDataset(archiverResult);
            const finalDataset: Array<DatePointInterface> = await differentiateData(
              rawDataset, name, [props.start, props.end, props.refDate]);
            const datasetTemp: any = {
              data: finalDataset,
              xID: 'x',
              label: name
            }
            datasetList.push(datasetTemp);
          }
        }
      })
    );
    return datasetList;
  };

  return(
    <div
      onClick={handleCanvasClick}>
      <BaseChart
        id={0}
        options={optionsDiff}
        ref={chartRef}/>
    </div>
  );
};

DiffChart.defaultProps = defaultProps;
export default connect(mapStateToProps)(DiffChart);
