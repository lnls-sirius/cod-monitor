import React from 'react';
import { Chart } from "chart.js";
import { TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from '../chart';
import { DatasetInterface, DictString } from '../../assets/interfaces/patterns';
import { DatasetInterface1 } from '../../assets/interfaces/bpm';

class ChartObject {
    private axisColors = {};

    // Get the axis color list
    getAxisColors(): DictString {
        return this.axisColors;
    }

    // Update the chart dataset
    updateDataset(chart: any, newData: DatasetInterface, options: any){
        chart.options = options;
        chart.data.datasets = newData;
        chart.data.labels= [];
        chart.update();
    }

     // Build the new chart dataset
    async buildChartDatasets(chart: any, newData: DatasetInterface1|DatasetInterface, options: any){
        let dataset: any = [];
        await Object.entries(newData).map(([name, state]) => {
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        this.updateDataset(chart, dataset, options);
        TimeDispatcher.setChangeTime(false);
    };
}

function createChart(): ChartObject {
    const chartEntity = new ChartObject();
    return chartEntity;
}

export default createChart();
