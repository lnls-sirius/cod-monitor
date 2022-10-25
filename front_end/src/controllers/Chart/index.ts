import React from 'react';
import { Chart } from "chart.js";
import { DatasetInterface, DictString } from '../Patterns/interfaces';
import { TimeDispatcher } from '../../redux/dispatcher';
import { setAxisColor } from './functions';

class ChartObject {
    private chart: Array<Chart>;
    private axisColors = {};

    constructor() {
        this.chart = [];
    }

    init(c: Chart, id: number){
        this.chart[id] = c;
    }

    getChart(id: number): Chart | null {
        return this.chart[id];
    }

    getAxisColors(): DictString {
        return this.axisColors;
    }

    setTitle(id: number){
        if (this.chart[id]!=null){
            const plugin = this.chart[id].options.plugins;
            if(plugin){
                const title = plugin.title;
                if(title){
                    switch(id){
                        case 1:{
                            title.text = 'COD Y';
                            break;
                        }
                        default:{
                            title.text = 'COD X';
                            break;
                        }
                    }
                }
            }
        }
        return this.chart[id];
    }

    setOptions(id: number, options: any){
        if(this.chart[id] != null){
            this.chart[id].options = options;
            this.chart[id].update();
        }
    }

    updateDataset(chart: any, newData: DatasetInterface){
        if(chart != null){
            chart.data.datasets = newData;
            chart.update();
        }
    }

    async buildChartDatasets(newData: DatasetInterface, id: number){
        let dataset: any = [];
        await Object.entries(newData).map(([name, state]) => {
            state = setAxisColor(state.label, state);
            dataset.push(state);
        });
        this.updateDataset(this.chart[id], dataset);
        TimeDispatcher.setChangeTime(false);
    };
}

function createChart(): ChartObject {
    const chartEntity = new ChartObject();
    return chartEntity;
}

export default createChart();
