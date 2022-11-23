import React from 'react';
import { Chart } from "chart.js";
import { TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from '../chart';
import { DatasetInterface, DictString } from '../../assets/interfaces/patterns';
import { DatasetInterface1 } from '../../assets/interfaces/bpm';

class ChartObject {
    private axisColors: DictString = {};
    private dataset: any = [];
    private datasetExt: any = [];

    // Get the axis color list
    getAxisColors(): DictString {
        return this.axisColors;
    }

    setDataset(newData: DatasetInterface1|DatasetInterface, axis?: string): void{
        if (axis == 'A' || axis == 'X'){
            this.dataset = newData;
        }else{
            this.datasetExt = newData;
        }
    }

    detectNewData(name: string, changeTime: boolean, axis?: string): DatasetInterface|null{
        let itemInfo: DatasetInterface|null = null;
        let dataset: any = this.dataset;
        if(axis == 'Y'){
            dataset = this.datasetExt;
        }
        if(!changeTime){
            dataset.map((item: DatasetInterface) => {
            if(item.label === name && item.data.length > 0){
              itemInfo = item;
            }
          });
        }
        return itemInfo;
    }

    // Update the chart dataset
    updateDataset(chart: any, newData: DatasetInterface, options: any){
        chart.options = options;
        chart.data.datasets = newData;
        chart.data.labels= [];
        chart.update();
    }

     // Build the new chart dataset
    async buildChartDatasets(chart: any, newData: DatasetInterface1|DatasetInterface, options: any, axis?: string): Promise<any> {
        let dataset: any = [];
        await Object.entries(newData).map(([name, state]) => {
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        this.updateDataset(chart, dataset, options);
        TimeDispatcher.setChangeTime(false);
        this.setDataset(dataset, axis);
        return dataset;
    };
}

function createChart(): ChartObject {
    const chartEntity = new ChartObject();
    return chartEntity;
}

export default createChart();
