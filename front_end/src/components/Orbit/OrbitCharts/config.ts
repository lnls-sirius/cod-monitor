import { Chart } from "chart.js";

export const optionsOrbit: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    bezierCurve: false,
    animation: { duration: 0 },
    elements: {
        point: {
          hoverRadius: 1,
        }
        // line: {
        //   cubicInterpolationMode: "monotone",
        //   stepped: true,
        //   tension: 0
        // },
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
                text: 'Difference'
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
