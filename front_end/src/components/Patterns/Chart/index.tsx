import React, { Component, createRef } from "react";
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';

import { colors } from "../../../assets/style/themes";
import * as S from './styled';

export const initData = {
  datasets: [{
      data: [],
      label: '',
      borderColor: colors.bg.transparent,
      backgroundColor: colors.bg.transparent
  }]
}

class BaseChart extends Component<any>{
  // Create a Basic Chart Element
  private id: number;
  private options: any;
  private chartRef: React.RefObject<HTMLCanvasElement>;
  public chart: Array<Chart>;

  // Initialize chart variables
  constructor(props: any){
    super(props);
    this.chartRef = createRef();
    this.options = props.options;
    this.id = props.id;
    this.chart = [];
  }

  // Create and configure chart component
  componentDidMount(): void {
    if(this.id == 0){
      if(this.chartRef.current != null){
        const options = this.options;
        this.chart[0] = new Chart(
          this.chartRef.current,
          { type: "line", data: initData, options });
      }
    }else{
      if(this.chartRef.current != null){
        const options = this.options;
        this.chart[0] = new Chart(
          this.chartRef.current,
          { type: "line", data: initData, options });
      }
    }
  }

  render() {
    return (
      <S.Chart
        id={"canvas"+this.id}
        ref={this.chartRef}/>
    )
  }
}

export default BaseChart;
