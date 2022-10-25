import React, { Component } from "react";
import { Chart } from 'chart.js';
import control from "../../../controllers/Chart";
import 'chartjs-adapter-moment';
import * as S from './styled';

export const initData = {
  datasets: [{
      data: [],
      label: '',
      borderColor: '#000000',
      backgroundColor: '#000000'
  }]
}

class BaseChart extends Component<any>{
  private id: number;
  private chart: Chart | null;
  private options: any;
  private chartRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);
    this.chartRef = props.reference;
    this.options = props.options;
    this.id = props.id;
    this.chart = null;
  }

  componentDidMount() {
    if(this.chartRef.current != null){
      const options = this.options;
      this.chart = new Chart(
        this.chartRef.current,
        { type: "line", data: initData, options });
      control.init(this.chart, this.id);
    }
  }

  render() {
    return (
      <S.Chart
        id="canvas"
        ref={this.chartRef}/>
    )
  }
}

export default BaseChart;
