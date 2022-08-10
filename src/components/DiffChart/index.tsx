import React, { useEffect, useRef, useState } from "react";
import Chart from 'chart.js/auto';
import { initData, options } from "./config";
import { connect, useSelector } from "react-redux";
import { getClosestDate} from "../../controllers/Time/interval";
import { TimeDispatcher, BpmDispatcher } from '../../redux/dispatcher';
import { getArchiver} from "../../controllers/archiver";
import { getColor } from "../../controllers/chart";
import Loading from "../Loading";
import * as S from './styled';

function mapStateToProps(state: any){
  const {start_date, end_date, ref_date} = state.time;
  const {list} = state.bpm;
  return {
    bpmList: list,
    startDate: new Date(start_date),
    endDate: new Date(end_date),
    refDate: new Date(ref_date)
  }
}

const DiffChart: React.FC = (props: any) => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState<Chart>();
  const [loading, setLoading] = useState<boolean>(false);

  const bpms = JSON.parse(props.bpmList);
  const axisColors = JSON.parse(useSelector((state: any) => state.bpm.colors));

  useEffect(() => {
    // setLoading(true);
    // buildChartDatasets();
    console.log(props.bpmList);
  }, [props.bpmList, props.startDate, props.endDate])

  useEffect(() => {
    if (chartRef.current){
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: initData,
        options: options
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
        x: data.x.toLocaleString(),
        y: data.y
      };
    });
  }

  async function differentiateData(diffData: any[], name: string): Promise<any>{
    let valueComp = await getClosestDate(name, props.refDate);
    diffData.map((point) =>{
      point.y = point.y - valueComp;
    });
    return diffData;
  }

  async function buildChartDatasets(){
    updateDataset(await buildChart());
    BpmDispatcher.setColorsList(JSON.stringify(axisColors));
    setLoading(false);
  }

  async function handleCanvasClick(evt: any){
    if(chartInstance){
      const chartParameters = chartInstance.chartArea;
      const chartTimeUnit = (props.endDate.getTime() - props.startDate.getTime())/chartParameters.width;
      const widPoint = evt.clientX - chartParameters.left;
      const newRefDate = chartTimeUnit * widPoint + props.startDate.getTime();
      TimeDispatcher.SetRefDate(new Date(newRefDate));
    }
  }

  async function buildChart(){
    return await Promise.all(
      Object.entries(bpms).map(async ([name, state]) => {
        if(state){
          const archiverResult = await getArchiver(name, props.startDate, props.endDate, 800);
          const rawDataset = await buildDataset(archiverResult);
          const finalDataset = await differentiateData(rawDataset, name);
          const color = getColor(name, axisColors);
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
      <Loading
        show={loading}/>
      <S.Chart
        ref={chartRef}
        onClick={handleCanvasClick}/>
    </div>
  );
};

export default connect(mapStateToProps)(DiffChart);
