import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import { initData, options } from "./config";
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

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
          type: 'line',
          data: initData,
          options
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
        y: data.y
      };
    });
  }

  function getAxesColor(index: number){
    let colors = [
      '#FF0000',
      '#00FF00',
      '#0000FF'
    ]
    return colors[index];
  }

  const buildChart = () => {
    setDataset([]);
    let bpmIndex = 0;
    Object.entries(bpms).map(async ([name, state]) => {
      if(state){
        let archiverResult = await getArchiver(name);
        setDataset((dataset: any) => [...dataset,
          {
            data: buildDataset(archiverResult),
            xAxisID: bpmIndex,
            label: name,
            borderColor: getAxesColor(bpmIndex),
            backgroundColor: getAxesColor(bpmIndex)
          }
        ]);
        bpmIndex += 1;
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
