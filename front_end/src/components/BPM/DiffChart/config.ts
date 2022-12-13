export const optionsDiff: any = {
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
        intersect: false
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
                modifierKey: 'ctrl'
            },
            zoom: {
                wheel: {
                    enabled: true,
                    modifierKey:'shift'
                },
                drag: {
                    enabled: true,
                    threshold: 100,
                    modifierKey:'shift'
                },
                mode: 'xy'
            }
        },
        legend: {
            display: false
        }
    }
}
