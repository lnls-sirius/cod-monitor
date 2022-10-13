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
        this.chartDiff = null;
        this.chartOrbit = null;
    }

    init(c: Chart | null, id: string){
        if(id == "diff"){
            this.chartDiff = c;
        }else{
            this.chartOrbit = c;
        }
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

    updateDataset(chart: any, newData: DatasetInterface){
        if (chart!=null){
            chart.data.datasets = newData;
            chart.update();
        }
    }

    async buildChartDatasets(newData: DatasetInterface, id: string){
        let dataset: any = [];
        await Object.entries(newData).map(([name, state]) => {
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        if(id == "diff"){
            this.updateDataset(this.chartDiff, dataset);
        }else{
            this.updateDataset(this.chartOrbit, dataset);
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
