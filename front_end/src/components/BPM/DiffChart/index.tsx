import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { getArchiver } from "../../../controllers/archiver";
import { buildDataset, differentiateData } from "../../../controllers/Chart/functions";
import { StoreInterface } from "../../../redux/storage/store";
import { ChartProperties } from "../../../controllers/Patterns/interfaces";
import { TimeDispatcher } from "../../../redux/dispatcher";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { optionsDiff } from "./config";

function mapStateToProps(state: StoreInterface){
  const {date_list, start_date, end_date, ref_date, change_time} = state.time;
  const {bpm_list, change_bpm} = state.bpm;

  return {
    state_list: JSON.parse(bpm_list),
    changeBpm: change_bpm,
    intervalMode: 0,
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(ref_date),
    changeTime: change_time,
    interval_list: JSON.parse(date_list)
  }
}

const DiffChart: React.FC<ChartProperties> = (props) => {
  const chartId = 0;
  Chart.register(...registerables);

  useEffect(() => {
    updateChartDiff();
  }, []);

  useEffect(() => {
    updateChartDiff();
  }, [props.changeBpm, props.changeTime])

  async function updateChartDiff() {
    const datasetList = await buildChartDiff();
    await control.buildChartDatasets(datasetList, chartId);
  }

  async function handleCanvasClick(evt: React.MouseEvent){
    const chart = control.getChart(chartId);
    if(chart != null){
      const chartParameters = chart.chartArea;
      const chartTimeUnit = (props.end.getTime() - props.start.getTime())/chartParameters.width;
      const widPoint = evt.clientX - chartParameters.left;
      const newRefDate = chartTimeUnit * widPoint + props.start.getTime();
      TimeDispatcher.setRefDate(new Date(newRefDate));
      TimeDispatcher.setChangeTime(true);
    }
  }

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
        options={optionsDiff}/>
    </div>
  );
};

export default connect(mapStateToProps)(DiffChart);
