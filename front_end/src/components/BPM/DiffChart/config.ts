export const optionsDiff: any = {
    animation: false,
    showLines: true,
    spanGaps: true,
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
                text: "Difference (nm)"
            }
        },
        x: {
            id: 'x',
            display: true,
            offset: false,
            type: 'time',
            ticks: {
                source: "auto",
                autoSkip: true,
                autoSkipPadding: 5,
                maxRotation: 0,
                minRotation: 0
            },
            title:  {
                display: true,
                text: "Time Interval"
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
                    threshold: 100,
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
