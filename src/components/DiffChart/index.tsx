import React, { useEffect, useRef, useState } from "react";
import Chart, { ChartDataset } from 'chart.js/auto';
import { initData, options } from "./config";
import archInterface from "../../data-access";
import { connect } from "react-redux";
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
  const chartRef = useRef(null);
  const bpms = JSON.parse(props.bpmList);
  const [dataset, setDataset]: ChartDataset<any>[] = useState([]);
  const [chartInstance, setChartInstance] = useState<Chart>();

  async function getArchiver(name: string){
    try {
      const res = await archInterface.fetchData(name, props.startDate, props.endDate);
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

  const buildDataset = (dataList: any) => {
    return dataList.map((data: any) => {
      return {
        x: data.x.toLocaleString("br-BR"),
        y: data.y
      };
    });
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  function getClosestDate(dataArray: any[]): number{

    let valueComp = 0;
    let selectedDate = new Date();
    let closestDate = props.refDate.getTime();


    dataArray.map((point) =>{
      let pointDate = new Date(point.x);
      let dateDiff = (selectedDate.getTime() - pointDate.getTime());
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

  function differentiateData(diffData: any[]): any{

    let valueComp = getClosestDate(diffData);
    diffData.map((point) =>{
      if(diffData[0] != point){
        let pointDate = new Date(point.x);
        point.y = point.y - valueComp;
        point.x = pointDate.toLocaleString();
      }else{
        let pointDate = new Date(point.x);
        point.y = point.y - diffData[1];
        point.x = pointDate.toLocaleString();
      }
    });

    return diffData;
  }

  function buildChart(){
    setDataset([]);
    Object.entries(bpms).map(async ([name, state]) => {
      if(state){
        let archiverResult = await getArchiver(name);
        let finalDataset = differentiateData(buildDataset(archiverResult));
        let color = getRandomColor();
        setDataset((dataset: any) => [...dataset,
          {
            data: finalDataset,
            xAxisID: 'x-axis-0',
            label: name,
            borderColor: color,
            backgroundColor: color
          }
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

export default connect(mapStateToProps)(DiffChart);
