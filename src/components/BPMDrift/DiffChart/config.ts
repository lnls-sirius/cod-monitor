import { TimeAxisID } from "../../../controllers/Time/constants";
import {Chart} from "chart.js";

const x_axes: any = {
    id: TimeAxisID,
    type: 'time',
    offset: false,
    distribution: "linear",
    ticks: {
        autoSkip: true,
        stepsize: 1,
        maxRotation: 0,
        minRotation: 0
    },
    time: {
        unit: "minute",
        unitStepSize: 5,
        displayFormats: {
            second: "HH:mm:ss",
            minute: "HH:mm",
            hour: "HH:ss",
            day: "MMM D hh:mm",
            month: "MMM YYYY"
        },
        tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ"
    }
}

const y_axes: any = {
    id: "y-axis-0",
    type: "linear",
    position: "left",
    title: {
        display: true,
        text: 'Position [um]'
    }
}

export const options: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    animation: { duration: 0 },
    bezierCurve: false,
    borderColor: 'rgb(75, 192, 192)',
    hover: {
        mode: "nearest",
        intersect: false
    },
    scales: {
        x: [x_axes],
        y: [y_axes]
    },
    plugins:{
        legend: {
            display: false
        }
    }
}
