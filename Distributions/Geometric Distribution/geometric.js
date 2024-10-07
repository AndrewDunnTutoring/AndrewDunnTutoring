const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Geometric Distribution',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: { beginAtZero: true },
            y: { beginAtZero: true }
        }
    }
});

function updateChart() {
    const p = parseFloat(document.getElementById('p').value);

    const mean = 1 / p;
    const stddev = Math.sqrt((1 - p) / (p * p));

    const geomData = [];
    const labels = [];

    for (let k = 1; k <= 20; k++) {
        const geomProb = geometricProbability(k, p);
        geomData.push(geomProb);
        labels.push(k);
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = geomData;
    chart.update();

    updateEquation(p, mean, stddev);
    updateSliderValues(p);
}

function geometricProbability(k, p) {
    return Math.pow(1 - p, k - 1) * p;
}

function updateEquation(p, mean, stddev) {
    const equation = `P(X = k) = (1 - ${p})^{k - 1} \\cdot ${p}`;
    document.getElementById('distributionEquation').innerHTML = `\\[ ${equation} \\]`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "distributionEquation"]);

    document.getElementById('meanValue').textContent = `${mean.toFixed(2)}`;
    document.getElementById('stddevValue').textContent = `${stddev.toFixed(2)}`;
}

function updateSliderValues(p) {
    document.getElementById('pValue').textContent = p.toFixed(2);
}

document.getElementById('p').addEventListener('input', updateChart);

updateChart();
