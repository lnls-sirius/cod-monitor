import React from 'react';
import { Chart } from "chart.js";
import { DatasetInterface, DictString } from '../Patterns/interfaces';
import { BpmDispatcher, TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from './functions';

class ChartObject {
    private chartDiff: Chart | null;
    private chartOrbit: Chart | null;
    private axisColors = {};

    constructor() {
        this.chartDiff=null;
        this.chartOrbit=null;
    }

    init(c: Chart | null, id: string){
        if(id == "diff"){
            this.chartDiff = c;
        }
        this.chartOrbit = c;
    }

    getChart(id: string): Chart | null {
        if(id == "diff"){
            return this.chartDiff;
        }
        return this.chartOrbit;
    }

    getAxisColors(): DictString {
        return this.axisColors;
    }

    async buildChartDatasets(datasets: any, id: string){
        this.updateDataset(datasets, id);
    }

    async updateDataset(newData: DatasetInterface, id: string){
        let dataset: any = [];
        Object.entries(newData).map(([name, state]) => {
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        let chart: Chart | null = this.getChart(id);
        if (chart!=null){
            chart.data.datasets = dataset;
            chart.update();
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
