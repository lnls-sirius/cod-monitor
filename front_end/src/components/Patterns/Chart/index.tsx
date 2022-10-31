import React, { Component, createRef } from "react";
import { Chart } from 'chart.js';
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
    if(this.chartRef.current != null){
      const options = this.options;
      this.chart[this.id] = new Chart(
        this.chartRef.current,
        { type: "line", data: initData, options });
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
