import React, { Component, createRef } from "react";
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';
import { colors } from "../../../assets/style/themes";
import { BaseChartInterface } from "../../../assets/interfaces/patterns";
import * as S from './styled';

export const initData = {
  datasets: [{
      data: [],
      label: '',
      borderColor: colors.bg.transparent,
      backgroundColor: colors.bg.transparent
  }]
}

class BaseChart extends Component<BaseChartInterface>{
  // Create a Basic Chart Element
  private id: number;
  private options: any;
  private chartRef: any;
  public chart: null|Chart;

  // Initialize chart variables
  constructor(props: BaseChartInterface){
    super(props);
    this.chartRef = createRef();
    this.options = props.options;
    this.id = props.id;
    this.chart = null;
  }

  createChart(reference: any): Chart{
    const options = this.options;
    return new Chart(
      reference,
      { type: "line", data: initData, options });
  }

  resetZoom(): void {
    if (this.chart) {
      this.chart.resetZoom();
    }
  }

  // Create and configure chart component
  componentDidMount(): void {
    if(this.chartRef.current != null){
      this.chart = this.createChart(
        this.chartRef.current)
    }
  }

  render() {
    return (
      <S.ChartWrapper>
        <S.Chart
          id={"canvas"+this.id}
          ref={this.chartRef}/>
        <S.Button onClick={this.resetZoom}>
          A
        </S.Button>
      </S.ChartWrapper>
    )
  }
}

export default BaseChart;
