import React, { Component } from "react";
import { Chart } from 'chart.js';
import { initData } from "./config";
import control from "../../../controllers/Chart";
import 'chartjs-adapter-moment';
import * as S from './styled';

class BaseChart extends Component<any>{
  private chart: Chart | null;
  private chartRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: any) {
    super(props);
    this.chartRef = React.createRef();
    this.chart = null;
  }

  componentDidMount() {
    const {options} = this.props;
    if(this.chartRef.current != null){
      this.chart = new Chart(
        this.chartRef.current,
        { type: "line", data: initData, options });
      control.init(this.chart, this.props.id);
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
