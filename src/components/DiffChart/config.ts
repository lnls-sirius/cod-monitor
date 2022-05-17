import { TimeAxisID } from "../../helpers/time";

const x_axis = {
    offset: false,
    id: 'TimeAxisID',
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
        minRotation: 0,
        stepSize: 1
    }
}

const y_axis = {
    type: "line",
    display: false,
    position: "left",
    id: "y-axis-0"
}

export const options = {
    plugins: {
        showLines: true,
        spanGaps: true,
        responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        ticks: {
            autoSkip: true,
            maxTicksLimit: 5
        },
        elements: {
            point: {
                hoverRadius: 0,
            },
            line: {
                cubicInterpolationMode: "monotone",
                stepped: true,
                tension: 2
            }
        },
        hover: {
            mode: "nearest",
            intersect: false,
            animationDuration: 0
        },
        title: { display: false },
        scales: {
            xAxis: [x_axis],
            yAxis: [y_axis]
        },
        legend: {
            display: false
        }
    }
}

export const initData = {
    datasets: []
}
