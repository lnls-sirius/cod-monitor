const x_axis = {
    type: 'time',
    id: 'x-axis-0',
    offset: false,
    time: {
        unit: "minute",
        displayFormats: {
            second: "HH:mm:ss",
            minute: "HH:mm",
            hour: "HH:ss",
            day: "MMM D hh:mm",
            month: "MMM YYYY"
        },
        tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ",
    }
}

const y_axis = {
    type: "linear",
    display: false,
    position: "left",
    id: "y-axis-0"
}

export const config = {
    plugins: {
        showLines: true,
        spanGaps: true,
        responsiveAnimationDuration: 0,
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
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
            intersect: false
        },
        title: { display: false },
        scales: {
            xAxis: x_axis,
            yAxis: y_axis
        },
        legend: {
            display: false,
        }
    }
}

export const initData = {
    labels: [],
    datasets: []
}
