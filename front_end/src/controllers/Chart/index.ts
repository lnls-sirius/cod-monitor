import React from 'react';
import { Chart } from "chart.js";
import { DatasetInterface, DictString } from '../Patterns/interfaces';
import { BpmDispatcher, TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from './functions';

class ChartObject {
    private chart: Array<Chart | null>;
    private axisColors = {};

    constructor() {
        this.chart = [];
    }

    init(c: Chart | null, id: number){
        this.chart[id] = c;
    }

    getChart(id: number): Chart | null {
        return this.chart[id];
    }

    getAxisColors(): DictString {
        return this.axisColors;
    }

    updateDataset(chart: any, newData: DatasetInterface){
        if (chart!=null){
            chart.data.datasets = newData;
            chart.update();
        }
    }

    async buildChartDatasets(newData: DatasetInterface, id: number){
        let dataset: any = [];

        await Object.entries(newData).map(([name, state]) => {
            console.log(newData)
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        this.updateDataset(this.chart[id], dataset);
        TimeDispatcher.setChangeTime(false);
        BpmDispatcher.setChangeBpm(false);
    };
}

function createChart(): ChartObject {
    const chartEntity = new ChartObject();
    return chartEntity;
}

export default createChart();
