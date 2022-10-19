import { Chart } from "chart.js";

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
                text: 'Difference (nm)'
            }
        },
        x: {
            id: 'x',
            display: true,
            offset: false,
            type: 'category',
            ticks: {
                autoSkip: true,
                maxTicksLimit: 20,
                maxRotation: 0,
                minRotation: 0,
                stepsize: 1
            },
            title: {
                display: true,
                text: "BPM"
            }
        }
    },
    plugins:{
        legend: {
            display: false
        }
    }
}
