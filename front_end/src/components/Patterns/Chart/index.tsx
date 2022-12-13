import { Component, createRef } from "react";
import { Chart } from 'chart.js';
import 'chartjs-adapter-moment';
import * as S from './styled';

// BaseChartInterface
class BaseChart extends Component<any>{
  // Create a Basic Chart Element
  private id: number;
  private options: any;
  private chartRef: any;
  private data: any;
  public chart: null|Chart;

  // Initialize chart variables
  constructor(props: any){
    super(props);
    this.chartRef = createRef();
    this.options = props.options;
    this.id = props.id;
    this.data = props.data;
    this.chart = null;
  }

  // Create a new chart object
  createChart(reference: any): Chart{
    const options = this.options;
    return new Chart(
      reference,
      { type: "line", data: this.data, options });
  }

  // Reset Zoom
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
    }else{
      console.log("Error!")
    }
  }

  render() {
    return (
      <S.ChartWrapper>
        <S.Chart
          id={"canvas"+this.id}
          ref={this.chartRef}/>
        <S.Button onClick={() => this.resetZoom()}>
          A
        </S.Button>
      </S.ChartWrapper>
    )
  }
}

export default BaseChart;
