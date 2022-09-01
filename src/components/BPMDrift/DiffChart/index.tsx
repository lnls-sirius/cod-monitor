import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { options } from "./config";
import { getArchiver} from "../../../controllers/archiver";
import { buildDataset, differentiateData } from "../../../controllers/Chart/functions";
import { StoreInterface } from "../../../redux/storage/store";
import { ChartProperties } from "../../../controllers/Patterns/interfaces";
import { TimeDispatcher } from "../../../redux/dispatcher";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";

function mapStateToProps(state: StoreInterface){
  const {start_date, end_date, ref_date, change_time} = state.time;
  const {list, change_bpm} = state.bpm;
  return {
    bpmList: JSON.parse(list),
    changeBpm: change_bpm,
    intervalMode: 0,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date),
    changeTime: change_time
  }
}

const DiffChart: React.FC<ChartProperties> = (props) => {
  const [datasets, setDatasets] = useState({});

  Chart.register(...registerables);

  useEffect(() => {
    updateChart();
  }, [props.changeBpm, props.changeTime])

  async function updateChart() {
    const datasetList = await buildChart();
    control.buildChartDatasets(datasetList);
    setDatasets(datasetList);
  }

  async function handleCanvasClick(evt: React.MouseEvent){
    const chart = control.getChart();
    if(chart != null){
      const chartParameters = chart.chartArea;
      const chartTimeUnit = (props.endDate.getTime() - props.startDate.getTime())/chartParameters.width;
      const widPoint = evt.clientX - chartParameters.left;
      const newRefDate = chartTimeUnit * widPoint + props.startDate.getTime();
      TimeDispatcher.setRefDate(new Date(newRefDate));
      TimeDispatcher.setChangeTime(true);
    }
  }

  async function buildChart(){
    return await Promise.all(
      Object.entries(props.bpmList).map(async ([name, state]) => {
        if(state){
          const archiverResult = await getArchiver(name, props.startDate, props.endDate, 800);
          if(archiverResult != undefined){
            const rawDataset = await buildDataset(archiverResult);
            const finalDataset = await differentiateData(rawDataset, name, props.refDate);
            const datasetTemp = {
              data: finalDataset,
              xID: 'x',
              label: name
            }
            return datasetTemp;
          }
        }
        return {};
      })
    );
  };

  return(
    <div
      onClick={handleCanvasClick}>
     <BaseChart
        options={options}/>
    </div>
  );
};

export default connect(mapStateToProps)(DiffChart);
