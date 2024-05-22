const datasets = {
    dataset1: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        data: [65, 59, 80, 81, 56, 55, 40]
    },
    dataset2: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        data: [28, 48, 40, 19, 86, 27, 90]
    }
};

const barCtx = document.getElementById('barChart').getContext('2d');
const lineCtx = document.getElementById('lineChart').getContext('2d');
const pieCtx = document.getElementById('pieChart').getContext('2d');

let barChart = new Chart(barCtx, {
    type: 'bar',
    data: {
        labels: datasets.dataset1.labels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
            hoverBorderColor: 'rgba(255, 99, 132, 1)',
            data: datasets.dataset1.data
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

let lineChart = new Chart(lineCtx, {
    type: 'line',
    data: {
        labels: datasets.dataset1.labels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
            hoverBorderColor: 'rgba(54, 162, 235, 1)',
            data: datasets.dataset1.data
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy'
                },
                zoom: {
                    wheel: {
                        enabled: true
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'xy'
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});

let pieChart = new Chart(pieCtx, {
    type: 'pie',
    data: {
        labels: datasets.dataset1.labels,
        datasets: [{
            label: 'Dataset 1',
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(199, 199, 199, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)'
            ],
            borderWidth: 1,
            hoverBackgroundColor: [
                'rgba(255, 99, 132, 0.4)',
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 206, 86, 0.4)',
                'rgba(75, 192, 192, 0.4)',
                'rgba(153, 102, 255, 0.4)',
                'rgba(255, 159, 64, 0.4)',
                'rgba(199, 199, 199, 0.4)'
            ],
            hoverBorderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(199, 199, 199, 1)'
            ],
            data: datasets.dataset1.data
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true
            }
        }
    }
});

document.getElementById('datasetSelector').addEventListener('change', function() {
    const selectedDataset = this.value;
    const selectedData = datasets[selectedDataset];

    updateChart(barChart, selectedData);
    updateChart(lineChart, selectedData);
    updateChart(pieChart, selectedData);
});

function updateChart(chart, data) {
    chart.data.labels = data.labels;
    chart.data.datasets[0].data = data.data;
    chart.data.datasets[0].label = `Dataset ${data === datasets.dataset1 ? 1 : 2}`;
    chart.update();
}

function exportData() {
    const selectedDataset = document.getElementById('datasetSelector').value;
    const data = datasets[selectedDataset];

    const csv = `Label,Value\n${data.labels.map((label, index) => `${label},${data.data[index]}`).join('\n')}`;

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${selectedDataset}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

