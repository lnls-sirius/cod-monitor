import control from "../../../controllers/Chart";

export const optionsOrbit: any = {
    showLines: true,
    spanGaps: true,
    responsiveAnimationDuration: 0,
    responsive: true,
    bezierCurve: false,
    elements: {
        point: {
            hoverRadius: 0
        }
    },
    hover: {
        mode: "nearest",
        intersect: true
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
        zoom: {
            pan: {
                enabled: true,
                mode: 'xy',
                modifierKey: 'shift'
            },
            zoom: {
                wheel: {
                    enabled: true,
                    modifierKey:'shift'
                },
                drag: {
                    enabled: true,
                    threshold: 1,
                    modifierKey:'ctrl'
                },
                pinch: {
                    enabled: true
                },
                mode: 'xy'
            }
        },
        legend: {
            display: false
        }
    }
}
