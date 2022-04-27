import Chart from 'chart.js/auto';

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
            month: "MMM YYYY",
        },
        tooltipFormat: "ddd MMM DD YYYY HH:mm:ss.S ZZ",
    }
}

const y_axis = {
    type: "linear",
    display: false,
    position: "left",
    id: "y-axis-0",
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
            tension: 2, // disable belzier curves
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
    labels: [65, 59, 56, 81, 56, 55, 40],
    datasets: [{data: [73, 4,55, 34, 5, 55, 40], xAxisID: 'x-axis-1', label: 'Series B'}]
}
