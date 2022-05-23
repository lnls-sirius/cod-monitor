import { TimeAxisID } from "../../helpers/time";
import {Chart} from "chart.js";

const x_axes: any = {
    offset: false,
    id: TimeAxisID,
    type: "time",
    distribution: "linear",
    time: {
        unit: "minute",
        unitStepSize: 10,
        displayFormats: {
        second: "HH:mm:ss",
        minute: "HH:mm",
        hour: "HH:ss",
        day: "MMM D hh:mm",
        month: "MMM YYYY",
        },
        tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ"
    },
    ticks: {
        source: "auto",
        autoSkip: true,
        autoSkipPadding: 5,
        maxTicksLimit: 5,
        maxRotation: 0,
        minRotation: 0
    }
}

const y_axes = {
    type: "line",
    display: false,
    position: "left",
    id: "y-axis-0"
}

export const options: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    animation: { duration: 0 },
    elements: {
        point: {
            hoverRadius: 0
        },
        line: {
            cubicInterpolationMode: "monotone",
            stepped: true,
            tension: 2
        }
    },
    hover: {
        mode: "nearest",
        intersect: false
    },
    title: { display: false },
    scales: {
        xAxes: [x_axes],
        yAxes: [y_axes]
    },
    plugins:{
        legend: {
            display: false
        }
    }
}

export const initData = {
    datasets: []
}
