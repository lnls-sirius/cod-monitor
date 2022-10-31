import React from 'react';
import { Chart } from "chart.js";
import { DatasetInterface, DatasetInterface1, DictString } from '../../assets/interfaces/patterns';
import { TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from './functions';

class ChartObject {
    private axisColors = {};

    getAxisColors(): DictString {
        return this.axisColors;
    }

    updateDataset(chart: any, newData: DatasetInterface, options: any){
        chart.options = options;
        chart.data.datasets = newData;
        chart.data.labels= [];
        chart.update();
    }

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
