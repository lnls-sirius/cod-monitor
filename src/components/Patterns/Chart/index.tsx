import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from 'chart.js';
import { initData } from "./config";
import { useSelector } from "react-redux";
import { StoreInterface } from "../../../redux/storage/store";
import { ChartInterface, DatasetInterface } from "../../../controllers/Patterns/interfaces";
import { BpmDispatcher, TimeDispatcher } from "../../../redux/dispatcher";
import { setAxisColor } from "../../../controllers/Patterns/chart";
import * as S from './styled';
import { TimeAxisIndex } from "../../../controllers/Time/constants";

const BaseChart: React.FC<ChartInterface> = (props) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const axisColors = JSON.parse(useSelector((state: StoreInterface) => state.bpm.colors));

  Chart.register(...registerables);

  useEffect(() => {
    buildChartDatasets();
  }, [props.datasets]);

  async function buildChartDatasets(){
    updateDataset(props.datasets);
    BpmDispatcher.setColorsList(JSON.stringify(axisColors));
  }

  function updateTimeAxis(): void {
    console.log(chartInstance?.config.options?.scales?.x)
    //scales['x-axis-0'].ticks
    console.log(chartRef.current)
    // chartInstance.options.scales.xAxes[TimeAxisIndex].time.unit = unit;
    // chartInstance.options.scales.xAxes[TimeAxisIndex].time.stepSize = unitStepSize;
    // chartInstance.options.scales.xAxes[TimeAxisIndex].ticks.min = props.startDate;
    // chartInstance.options.scales.xAxes[TimeAxisIndex].ticks.max = endDate;
  }

  async function updateDataset(newData: DatasetInterface){
    let dataset: any = [];
    Object.entries(newData).map(([name, state]) => {
      if(state != false){
        state = setAxisColor(state.label, state, axisColors);
        dataset.push(state);
      }
    });
    if (chartInstance!=null){
      chartInstance.data.datasets = dataset;
      chartInstance.update();
    }
    TimeDispatcher.setChangeTime(false);
    BpmDispatcher.setChangeBpm(false);
  };

  function click(evt: React.MouseEvent){
    props.clickAction(evt, chartInstance);
    updateTimeAxis();
  }

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

  return(
    <S.Chart
      ref={chartRef}
      onClick={click}/>
  );
};

export default BaseChart;
