import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import * as S from './styled';
import { config, initData } from "./config";
import { useSelector } from "react-redux";
import archInterface from "../../data-access";
import { TimeDispatcher } from "../../helpers/time";

interface Data {
  chartData: number[];
}

const DiffChart: React.FC<Data> = ({ chartData }: Data) => {
  const timeDispatch = new TimeDispatcher();
  const bpmList = useSelector((state: any) => state.bpm.listBpm);
  const bpms = JSON.parse(bpmList);
  const chartRef = useRef(null);
  const [dataset, setDataset]: ChartDataset<any>[] = useState([]);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const startDate = timeDispatch.GetStartDate();
  const endDate = timeDispatch.GetEndDate();

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
          data: initData,
          options: config
        });
      setChartInstance(newChartInstance);
    }
  }, [chartRef]);

  function setLabels(newData: any){
    var values=[];
    for(var c=0; c<newData.length; c++){
      values.push(newData[c]['x']);
    }
    console.log(values);
    return values;
  }

  const updateDataset = (newData: any) => {
    if (chartInstance!=null){
      chartInstance.data.labels = setLabels(newData);
      chartInstance.data.datasets = newData;
      chartInstance.update();
    }
  };

  const buildDataset = () => {
    setDataset([]);
    Object.entries(bpms).map(async ([name, state]) => {
      if(getState(state)){
        let archiverResult = await getArchiver(name);
        console.log(archiverResult);
        setDataset((dataset: any) => [...dataset,
          {data: archiverResult, xAxisID: 'x-axis-1', label: name}
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
