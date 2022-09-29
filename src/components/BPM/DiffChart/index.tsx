import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { getArchiver} from "../../../controllers/archiver";
import { buildDataset, differentiateData } from "../../../controllers/Chart/functions";
import { StoreInterface } from "../../../redux/storage/store";
import { ChartProperties } from "../../../controllers/Patterns/interfaces";
import { TimeDispatcher } from "../../../redux/dispatcher";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { posX } from "../../../assets/bpms/PosX";
import { posY } from "../../../assets/bpms/PosY";

function mapStateToProps(state: StoreInterface){
  const {date_list, start_date, end_date, ref_date, change_time} = state.time;
  const {bpm_list, change_bpm, axis} = state.bpm;

  return {
    state_list: JSON.parse(bpm_list),
    changeBpm: change_bpm,
    intervalMode: 0,
    start: new Date(start_date),
    end: new Date(end_date),
    refDate: new Date(ref_date),
    changeTime: change_time,
    axis: axis,
    interval_list: JSON.parse(date_list)
  }
}

const DiffChart: React.FC<ChartProperties & {id: string}> = (props) => {
  Chart.register(...registerables);
  
  useEffect(() => {
    switch(props.id){
      case "diff": {
        updateChartDiff();
        break;
      }
      case "orbit": {
        updateChartOrbit();
        break;
      }
    }
  }, [])

  useEffect(() => {
    if(props.id == "diff"){
      updateChartDiff();
    }
  }, [props.changeBpm, props.changeTime])

  useEffect(() => {
    if(props.id == "orbit"){
      updateChartOrbit();
    }
  }, [props.interval_list])
  

  async function updateChartOrbit() {
    const datasetList = await buildChartOrbit();
    control.buildChartDatasets(datasetList, props.id);
  }

  async function updateChartDiff() {
    const datasetList = await buildChartDiff();
    await control.buildChartDatasets(datasetList, props.id);
  }

  function getName(name: string): string{
    let label = name.replace("SI-", "")
    label = label.replace(":DI-BPM", "")
    label = label.replace("Pos", "")
    label = label.replace("-Mon", "")
    return label
  }

  function getBpmAxis(axis: string) {
    if (axis == 'Y'){
      return posY;
    }
    return posX;
  }

  async function buildChartOrbit(){
    let datasetList: any = []
    await Promise.all(
      Object.entries(props.interval_list).map(async ([id, interval]) => {
        let finalDataset: Array<{x: string, y: number}> = [];
        for (let bpm_id of getBpmAxis(props.axis)){
          // const start = await getRefArchiver(bpm_id, new Date(interval.start));
          // const end = await getRefArchiver(bpm_id, new Date(interval.end));
          // if(start !=undefined && end !=undefined){
          //   const diff = end[0].y - start[0].y;
            const diff = 1
            finalDataset.push({
              x: getName(bpm_id),
              y: diff
            });
          // }
        }
        const datasetTemp = {
          data: finalDataset,
          xID: 'x',
          label: id
        }
        datasetList.push(datasetTemp)
      })
    );
    return datasetList
  };

  async function handleCanvasClick(evt: React.MouseEvent){
    if(props.id == "diff"){
      const chart = control.getChart("diff");
      if(chart != null){
        const chartParameters = chart.chartArea;
        const chartTimeUnit = (props.end.getTime() - props.start.getTime())/chartParameters.width;
        const widPoint = evt.clientX - chartParameters.left;
        const newRefDate = chartTimeUnit * widPoint + props.start.getTime();
        TimeDispatcher.setRefDate(new Date(newRefDate));
        TimeDispatcher.setChangeTime(true);
      }
    }
  }

  async function buildChartDiff(){
    let datasetList: any = []
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
    return datasetList
  };

  return(
    <div
      onClick={handleCanvasClick}>
     <BaseChart
        id={props.id}/>
    </div>
  );
};

export default connect(mapStateToProps)(DiffChart);
