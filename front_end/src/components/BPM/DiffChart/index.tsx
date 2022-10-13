import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { getArchiver, getDataInArchiver} from "../../../controllers/archiver";
import { buildDataset, differentiateData } from "../../../controllers/Chart/functions";
import { StoreInterface } from "../../../redux/storage/store";
import { BpmPointInterface, ChartProperties, DictNumber } from "../../../controllers/Patterns/interfaces";
import { TimeDispatcher } from "../../../redux/dispatcher";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { pos } from "../../../assets/bpms/pos";
import { getBpmName } from "../../../controllers/Patterns/functions";
import { corr_CH, corr_CV } from "../../../assets/bpms/corr";
import { rf } from "../../../assets/bpms/genPv";

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

  function getBpmAxis(axis: string): Array<string>{
    let bpmList: Array<string> = [];
    pos.map((bpm) => {
      bpmList.push(getBpmName(bpm, axis));
    })
    return bpmList;
  }

  function delta_list(
    list: Array<string>, start: DictNumber, end: DictNumber): Array<number> {
      // let dataset: Array<BpmPointInterface> = []
      let dataList: Array<number> = []
      list.map((name) => {
        const diff = end[name] - start[name];
        dataList.push(diff)
        // dataset.push({
        //   x: getName(name),
        //   y: diff
        // });
      });
      return dataList
  }

  async function buildChartOrbit(){
    let datasetList: any = []
    await Promise.all(
      Object.entries(props.interval_list).map(async ([id, interval]) => {
        let bpmX: Array<string> = []
        let bpmY: Array<string> = []
        let codX: Array<number> = []
        let codY: Array<number> = []
        let kickCH: Array<number> = []
        let kickCV: Array<number> = []
        let deltaRf: Array<number> = []
        let delta_kick = []
        let delta_bpm = []
        bpmX = getBpmAxis('X');
        bpmY = getBpmAxis('X');
        const orbit_info = [...bpmX, ...bpmY, ...corr_CH, ...corr_CV, rf];
        const start = await getDataInArchiver(
          orbit_info, new Date(interval.start));
        const end = await getDataInArchiver(
          orbit_info, new Date(interval.end));
        if(start != undefined && end != undefined){
          codX = delta_list(bpmX, start, end);
          codY = delta_list(bpmY, start, end);
          kickCH = delta_list(corr_CH, start, end);
          kickCV = delta_list(corr_CV, start, end);
          deltaRf = delta_list([rf], start, end);
          delta_kick = [...kickCH, ...kickCV, ...deltaRf]
          delta_bpm = [...codX, ...codY]
          console.log(delta_bpm)
          console.log(delta_kick)
        }
        const datasetTemp = {
          data: [],
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
