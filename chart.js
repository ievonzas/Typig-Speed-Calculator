export class ChartManager {
    constructor(container) {
        this.chartContainer = container;
    }
    showChart() {
        this.chartContainer.innerHTML = '';

        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 100;
        this.chartContainer.appendChild(canvas);

        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => this.createChart(canvas, ['No attempts yet'], [0], [0]);
            document.head.appendChild(script);
        } else {
            this.createChart(canvas, ['No attempts yet'], [0], [0]);
        }
    }
    updateChart(data) {
        if (data.length === 0) {
            this.showChart();
            return;
        }
        this.chartContainer.innerHTML = '';
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 100;
        this.chartContainer.appendChild(canvas);

        const labels = [];
        const wpmData = [];
        const accuracyData = [];

        for (let i = 0; i < data.length; i++) {
            labels.push("Attempt " + (i + 1));
            wpmData.push(data[i].wpm);
            accuracyData.push(data[i].accuracy);
        }

        if (typeof Chart === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
            script.onload = () => this.createChart(canvas, labels, wpmData, accuracyData);
            document.head.appendChild(script);
        } else {
            this.createChart(canvas, labels, wpmData, accuracyData);
        }
    }

    createChart(canvas, labels, wpmData, accuracyData) {
        const ctx = canvas.getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'WPM',
                        data: wpmData,
                        borderColor: 'rgb(126, 21, 112)',
                        tension: 0.1,
                        yAxisID: 'y'
                    },
                    {
                        label: 'Accuracy %',
                        data: accuracyData,
                        borderColor: 'rgb(245, 127, 196)',
                        tension: 0.1,
                        yAxisID: 'y1'
                    }
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    y: {
                        position: 'left',
                        title: {
                            display: true,
                            text: 'WPM'
                        }
                    },
                    y1: {
                        position: 'right',
                        title: {
                            display: true,
                            text: 'Accuracy %'
                        },
                        grid: {
                            drawOnChartArea: false
                        }
                    }
                }
            }
        });
    }
}