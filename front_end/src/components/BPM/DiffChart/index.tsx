import React, { createRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';

import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { getArchiver } from "../../../controllers/archiver";
import { buildDataset, changeDateClick, differentiateData, unsetBPMChange } from "../../../controllers/Chart/functions";

import { optionsDiff } from "./config";
import { ChartProperties } from "../../../assets/interfaces/patterns";
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

const defaultProps = {
  state_list: {},
  start: new Date(),
  end: new Date(),
  refDate: new Date(),
  changeBpm: false,
  changeTime: false
}

const DiffChart: React.FC<ChartProperties> = (props) => {
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
      const chart = chartRef.current.chart[0];
      if(chart != null){
        const chartParameters = chart.chartArea;
        const chartTimeUnit = (props.end.getTime() - props.start.getTime())/chartParameters.width;
        const widPoint = evt.clientX - chartParameters.left;
        const newRefDate = new Date(chartTimeUnit * widPoint + props.start.getTime());
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
      const chart = chartRef.current.chart[0];
      if(chart != null){
        const datasetList = await buildChartDiff();
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
        if(state){
          const archiverResult = await getArchiver(name, props.start, props.end, 800);
          if(archiverResult != undefined){
            const rawDataset = await buildDataset(archiverResult);
            const finalDataset = await differentiateData(
              rawDataset, name, [props.start, props.end, props.refDate]);
            const datasetTemp = {
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
