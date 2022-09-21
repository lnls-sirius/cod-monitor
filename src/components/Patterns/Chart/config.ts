import { Chart } from "chart.js";

export const optionsDiff: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    animation: { duration: 0 },
    elements: {
        point: {
          hoverRadius: 0,
        },
        line: {
          cubicInterpolationMode: "monotone",
          stepped: true,
          tension: 0
        },
      },
    hover: {
        mode: "nearest",
        intersect: false
    },
    scales: {
        y: {
            display: true,
            title: {
                display: true,
                text: 'diff'
            }
        },
        x: {
            id: 'x',
            display: true,
            offset: false,
            type: 'time',
            time: {
                unit: "minute",
                displayFormats: {
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH:ss",
                  day: "MMM D hh:mm",
                  month: "MMM YYYY"
                },
                tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ"
            },
            ticks: {
                source: "auto",
                autoSkip: true,
                autoSkipPadding: 5,
                maxRotation: 0,
                minRotation: 0,
                stepSize: 1
            },
            title:  {
                display: true,
                text: "diff"
            }
        }
    },
    plugins:{
        legend: {
            display: false
        }
    }
}

export const optionsOrbit: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    animation: { duration: 0 },
    elements: {
        point: {
          hoverRadius: 0,
        },
        line: {
          cubicInterpolationMode: "monotone",
          stepped: true,
          tension: 0
        },
      },
    hover: {
        mode: "nearest",
        intersect: false
    },
    scales: {
        y: {
            display: true,
            title: {
                display: true,
                text: 'orbit'
            }
        },
        x: {
            id: 'x',
            display: true,
            offset: false,
            type: 'category',
            ticks: {
                maxRotation: 0,
                minRotation: 0,
                stepSize: 1
            },
            title: {
                display: true,
                text: "orbit"
            }
        }
    },
    plugins:{
        legend: {
            display: false
        }
    }
}

export const initData = {
    datasets: [{
        data: [],
        label: '',
        borderColor: '#000000',
        backgroundColor: '#000000'
    }]
}
