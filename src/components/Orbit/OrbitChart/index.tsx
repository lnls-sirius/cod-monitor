import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { options } from "./config";
import { StoreInterface } from "../../../redux/storage/store";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { IntervalListInterface } from "../../../controllers/Time/interfaces";
import { getRefArchiver } from "../../../controllers/archiver";
import { posX } from "../../../assets/bpms/PosX";

function mapStateToProps(state: StoreInterface){
  const { list } = state.time;
  return {
    interval_list: JSON.parse(list)
  }
}

const OrbitChart: React.FC<IntervalListInterface> = (props) => {
  const chartId = "orbit";
  Chart.register(...registerables);

  useEffect(() => {
    updateChart();
  }, [props.interval_list])

  async function updateChart() {
    const datasetList = await buildChart();
    control.buildChartDatasets(datasetList, chartId);
  }

  async function buildChart(){
    return await Promise.all(
      Object.entries(props.interval_list).map(async ([id, interval]) => {
        let finalDataset: Array<{x: string, y: number}> = [];
        for (let bpm_id of posX){
          const start = await getRefArchiver(bpm_id, new Date(interval.start));
          const end = await getRefArchiver(bpm_id, new Date(interval.end));
          if(start !=undefined && end !=undefined){
            const diff = end[0].y - start[0].y;
            finalDataset.push({
              x: bpm_id,
              y: diff
            });
          }
        }
        const datasetTemp = {
          data: finalDataset,
          xID: 'x',
          label: id
        }
        return datasetTemp;
      })
    );
  };

  return(
    <BaseChart
      id="orbit"
      options={options}/>
  );
};

export default connect(mapStateToProps)(OrbitChart);
