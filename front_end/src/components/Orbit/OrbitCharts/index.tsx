import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Chart, registerables } from 'chart.js';
import { StoreInterface } from "../../../redux/storage/store";
import { ChartProperties } from "../../../controllers/Patterns/interfaces";
import BaseChart from "../../Patterns/Chart";
import control from "../../../controllers/Chart";
import { optionsOrbit } from "./config";
import * as S from './styled';

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

const OrbitCharts: React.FC<ChartProperties> = (props) => {
  const chartId = 1;
  Chart.register(...registerables);

  useEffect(() => {
    updateChartOrbit();
  }, [props.interval_list])

  async function updateChartOrbit() {
    const datasetList = await buildChartOrbit();
    control.buildChartDatasets(datasetList, chartId);
  }

  async function buildChartOrbit(){
    let datasetList: any = []
    await Promise.all(
      Object.entries(props.interval_list).map(async ([id, interval]) => {
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


  return(
    <S.ChartWrapper>
      <BaseChart
        id={1}
        options={optionsOrbit}/>
      <BaseChart
        id={2}
        options={optionsOrbit}/>
    </S.ChartWrapper>
  );
};

export default connect(mapStateToProps)(OrbitCharts);
