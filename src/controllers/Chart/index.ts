import React from 'react';
import { Chart } from "chart.js";
import { DatasetInterface, DictString } from '../Patterns/interfaces';
import { BpmDispatcher, TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from './functions';

class ChartObject {
    private chart: Chart | null;
    private axisColors = {};

    constructor() {
        this.chart=null;
    }

    init(c: Chart | null){
        this.chart = c;
    }

    getChart(): Chart | null{
        return this.chart;
    }

    getAxisColors(): DictString {
        return this.axisColors;
    }

    async buildChartDatasets(datasets: any){
        this.updateDataset(datasets);
    }

    async updateDataset(newData: DatasetInterface){
        let dataset: any = [];
        Object.entries(newData).map(([name, state]) => {
            if(state != false){
                state = setAxisColor(state.label, state);
                dataset.push(state);
            }
        });
        if (this.chart!=null){
            this.chart.data.datasets = dataset;
            this.chart.update();
            console.log(this.chart.options.scales);
        }
        TimeDispatcher.setChangeTime(false);
        BpmDispatcher.setChangeBpm(false);
    };
}

function createChart(): ChartObject {
    const chartEntity = new ChartObject();
    return chartEntity;
}

export default createChart();
