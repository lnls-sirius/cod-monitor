import React, { Component } from "react";
import { Chart } from 'chart.js';
import { initData, optionsDiff, optionsOrbit } from "./config";
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

  getOptions(): any {
    const {id} = this.props;
    console.log(id)
    switch(id){
      case "diff": {
        return optionsDiff;
      }
      case "orbit": {
        return optionsOrbit;
      }
      default: {
        return optionsOrbit;
      }
    }
  }

  componentDidMount() {
    if(this.chartRef.current != null){
      const options = this.getOptions()
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
