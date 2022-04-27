import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import * as S from './styled';
import { config, initData } from "./config";

interface Data {
  chartData: number[];
}

const DiffChart: React.FC<Data> = ({ chartData }: Data) => {
  const [dataset, setDataset]: ChartDataset<any>[] = useState([]);
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<Chart>();

  useEffect(() => {
    if (chartRef && chartRef.current) {
      const newChartInstance = new Chart(
        chartRef.current, {
          type: 'line',
          data: initData,
          options: config
        });
      setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  const updateDataset = (newData: ChartDataset<any>[] | { data: number[]; xAxisID: string; label: string; }[]) => {
    if (chartInstance!=null){
      chartInstance.data.labels = [65, 59, 80, 81, 56, 55, 40];
      chartInstance.data.datasets = newData;
      chartInstance.update();
    }
  };

  const addDataset = () => {
    setDataset([...dataset,
      {data: [63, 3, 2, 5, 5, 55, 40], xAxisID: 'x-axis-1', label: 'Series B'}]);
    updateDataset(dataset);
  };

  return(
    <div>
      <S.Chart
        id="myChart"
        ref={chartRef}/>
      <button onClick={addDataset}>Add Dataset</button>
    </div>
  );
};

export default DiffChart;
