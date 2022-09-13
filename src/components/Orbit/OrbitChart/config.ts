import { Chart } from "chart.js";

export const options: any = {
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
                text: 'Deviation'
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
                display: false
            }
        }
    },
    plugins:{
        legend: {
            display: false
        }
    }
}
