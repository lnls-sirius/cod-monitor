import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { useSelector } from "react-redux";
import Loading from "../../Loading";
import { initData } from "./config";
import { BpmDispatcher } from "../../../redux/dispatcher";
import { ChartInterface } from "../../../controllers/Patterns/interfaces";
import * as S from './styled';

const BaseChart: React.FC<ChartInterface> = (props) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const [loading, setLoading] = useState<boolean>(false);
  const axisColors = JSON.parse(useSelector((state: any) => state.bpm.colors));

  Chart.register(...registerables);

  useEffect(() => {
    setLoading(true);
    buildChartDatasets();
  }, [props.datasets]);

  useEffect(() => {
    if (chartRef.current){
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: initData,
        options: props.options
      });
      setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  async function updateDataset(newData: any){
    let dataset: any = [];
    Object.entries(newData).map(([name, state]) => {
      if(state != false){
        dataset.push(state);
      }
    });
    if (chartInstance!=null){
      chartInstance.data.datasets = dataset;
      chartInstance.update();
    }
  };

  async function buildChartDatasets(){
    updateDataset(props.datasets);
    BpmDispatcher.setColorsList(JSON.stringify(axisColors));
    setLoading(false);
  }

  //props.clickAction

  return(
    <div>
      <Loading
        show={loading}/>
      <S.Chart
        ref={chartRef}
        onClick={()=>console.log("Click")}/>
    </div>
  );
};

export default BaseChart;
