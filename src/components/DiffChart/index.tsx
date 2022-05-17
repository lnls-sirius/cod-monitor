import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import { options } from "./config";
import { useSelector } from "react-redux";
import archInterface from "../../data-access";
import * as S from './styled';

const DiffChart: React.FC = () => {
  const bpmList = useSelector((state: any) => state.bpm.listBpm);
  const startDate = new Date(useSelector((state: any) => state.time.start_date));
  const endDate = new Date(useSelector((state: any) => state.time.end_date));
  const bpms = JSON.parse(bpmList);
  const chartRef = useRef(null);
  const [dataset, setDataset]: ChartDataset<any>[] = useState([]);
  const [chartInstance, setChartInstance] = useState<Chart>();

  async function getArchiver(name: string){
    try {
      const res = await archInterface.fetchData(name, startDate, endDate);
      const { data } = res;
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
  }

  function getState(state: any){
    return state['state'];
  }

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(
        chartRef.current, {
          type: 'line',
          options: options
        });
      setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  const updateDataset = (newData: any) => {
    if (chartInstance!=null){
      chartInstance.data.datasets = newData;
      chartInstance.update();
    }
  };

  const buildDataset = (data: any) => {
    return data.map((data: any) => {
      return {
        x: data.x.toLocaleString("br-BR") + "." + data.x.getMilliseconds(),
        y: data.y,
        backgroundColor: '#FFFFFF',
        yAxisID: 'yid',
        xAxisID: 'TimeAxisID',
        borderWidth: 1.5,
        data: data,
        fill: false,
        pointRadius: 0,
        showLine: true,
        steppedLine: true,

      };
    });
  }

  const buildChart = () => {
    setDataset([]);
    Object.entries(bpms).map(async ([name, state]) => {
      if(getState(state)){
        let archiverResult = await getArchiver(name);
        console.log(archiverResult);
        setDataset((dataset: any) => [...dataset,
          {data: buildDataset(archiverResult), xAxisID: 'x-axis-1', label: name}
        ]);
      }
    });
    updateDataset(dataset);
  };

  return(
    <div>
      <S.Chart
        id="myChart"
        ref={chartRef}/>
      <button onClick={buildChart}>Add Dataset</button>
    </div>
  );
};

export default DiffChart;
