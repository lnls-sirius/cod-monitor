import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import { initData, options } from "./config";
import archInterface from "../../data-access";
import { connect, useSelector } from "react-redux";
import { BpmDispatcher } from "../../helpers/bpm";
import Loading from "../Loading";
import * as S from './styled';

function mapStateToProps(state: any){
  const {start_date, end_date, ref_date} = state.time;
  const {bpm_list} = state.bpm;

  return {
    bpmList: bpm_list,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date)
  }
}

const DiffChart: React.FC = (props: any) => {
  const bpmDispatch = new BpmDispatcher();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const [loading, setLoading] = useState<boolean>(false);
  const bpms = JSON.parse(props.bpmList);
  const axisColors = JSON.parse(useSelector((state: any) => state.bpm.colors));
  let bpmVal = 100/20;
  const [loading2, setLoading2] = useState<number>(0);

  setTimeout(() => {
    if(loading2<100){
      setLoading2(loading2+bpmVal);
    }else{
      setLoading2(bpmVal)
    }
  }, 50);

  async function getArchiver(name: string){
    try {
      const res = await archInterface.fetchData(name, props.startDate, props.endDate);
      const { data } = res;
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
  }

  async function getRefArchiver(name: string){
    try {
      const interval = 100;
      const startDate = new Date(props.refDate.getTime() - interval);
      const endDate = new Date(props.refDate.getTime() + interval);
      const res = await archInterface.fetchData(name, startDate, endDate);
      const { data } = res;
      return data;
    } catch (e) {
      console.log("Something went wrong!!" + e);
    }
  }

  useEffect(() => {
    setLoading(loading => loading = true);
    buildChartDatasets();
  }, [props.bpmList, props.startDate, props.endDate])

  useEffect(() => {
    if (chartRef.current){
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: initData,
        options
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

  const buildDataset = (dataList: any) => {
    return dataList.map((data: any) => {
      return {
        x: data.x.toLocaleString("br-BR"),
        y: data.y
      };
    });
  }

  async function getClosestDate(name: string): Promise<number>{
    const refDate = await getRefArchiver(name);
    let selectedDate = props.refDate;
    let closestDate = selectedDate.getTime();
    let valueComp = 0;
    try{
      if(refDate != undefined){
        refDate.shift();
        refDate.map((point) =>{
          let dateDiff = (selectedDate.getTime() - point.x.getTime());
          if(dateDiff < 0){
            dateDiff *= -1;
          }
          if(closestDate > dateDiff){
            closestDate = dateDiff;
            valueComp = point.y;
          }
        });
        return valueComp;
      }
    }catch(e){
      console.log("Error " + e);
    }
    return -1;
  }

  async function differentiateData(diffData: any[], name: string): Promise<any>{
    let valueComp = await getClosestDate(name);
    diffData.map((point) =>{
      point.y = point.y - valueComp;
    });
    return diffData;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function getColor(name: string){
    if(!(name in axisColors)){
      axisColors[name] = getRandomColor();
    }
    return axisColors[name];
  }

  function load(){
    if(loading == true){
      return <Loading progress={loading2}/>;
    }
    return '';
  }

  async function buildChartDatasets(){
    updateDataset(await buildChart());
    bpmDispatch.setColorsList(JSON.stringify(axisColors));
    setLoading(loading => loading = false);
  }

  async function buildChart(){
    return await Promise.all(
      Object.entries(bpms).map(async ([name, state]) => {
        if(state){
          const archiverResult = await getArchiver(name);
          const rawDataset = await buildDataset(archiverResult);
          rawDataset.shift();
          const finalDataset = await differentiateData(rawDataset, name);
          const color = getColor(name);
          const datasetTemp = {
            data: finalDataset,
            xAxisID: 'x-axis-0',
            label: name,
            borderColor: color,
            backgroundColor: color
          };
          return datasetTemp;
        }else{
          return false;
        }
      })
    );
  };

  return(
    <div>
      {load()}
      <S.Chart
        ref={chartRef}/>
    </div>
  );
};

export default connect(mapStateToProps)(DiffChart);
