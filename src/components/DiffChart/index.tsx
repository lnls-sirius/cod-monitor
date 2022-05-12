import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import * as S from './styled';
import { config, initData } from "./config";
import { useSelector } from "react-redux";
import archInterface from "../../data-access";

interface Data {
  chartData: number[];
}

const DiffChart: React.FC<Data> = ({ chartData }: Data) => {
  const bpmList = useSelector((state: any) => state.bpm.listBpm);
  const bpms = JSON.parse(bpmList);
  const chartRef = useRef(null);
  const [dataset, setDataset]: ChartDataset<any>[] = useState([]);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const startDate = useSelector((state: any) => state.time.start_date);
  const endDate = useSelector((state: any) => state.time.end_date);

  async function getArchiver(){
    try {
      const res = await archInterface.fetchData('SI-02C3:DI-BPM-1:PosX-Mon', startDate, endDate);
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
          data: initData,
          options: config
        });
      setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  const updateDataset = (newData: ChartDataset<any>[] | { data: number[]; xAxisID: string; label: string; }[]) => {
    if (chartInstance!=null){
      // chartInstance.data.labels = xLabels;
      chartInstance.data.datasets = newData;
      chartInstance.update();
    }
  };

  const buildDataset = () => {
    setDataset([]);
    Object.entries(bpms).map(async ([name, state]) => {
      if(getState(state)){
        let archiverResult = getArchiver();
        // setLabels(archiverResult);
        setDataset((dataset: any) => [...dataset,
          {data: [12,1234,1234], xAxisID: 'x-axis-1', label: name}
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
      <button onClick={buildDataset}>Add Dataset</button>
    </div>
  );
};

export default DiffChart;
