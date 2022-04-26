import React, { useEffect, useRef, useState } from "react";
import {Chart} from 'chart.js';
import * as S from './styled';

interface Data {
  chartData: number[];
}

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
];

const data = {
  labels: labels,
  datasets: [{
    label: 'My First dataset',
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgb(255, 99, 132)',
    data: [0, 10, 5, 2, 20, 30, 45],
  }]
};

const configu = {
  type: 'line',
  data: data,
  options: {}
};

const DiffChart: React.FC<Data> = ({ chartData }: Data) => {
  // use a ref to store the chart instance since it it mutable
  const chartRef = useRef<Chart | null>(null);

  // callback creates the chart on the canvas element
  const canvasCallback = (canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      chartRef.current = new Chart(ctx, configu);
    }
  };

  // // effect to update the chart when props are updated
  // useEffect(() => {
  //   // must verify that the chart exists
  //   const chart = chartRef.current;
  //   if (chart) {
  //     // chart.data = formatData(chartData);
  //     chart.update();
  //   }
  // }, [chartData]);

  return(
    <S.ChartWrapper>
      <S.Chart
        ref={canvasCallback}/>
    </S.ChartWrapper>
  );
};

export default DiffChart;
