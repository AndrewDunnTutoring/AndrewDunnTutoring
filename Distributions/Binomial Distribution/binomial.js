const ctx = document.getElementById('chart').getContext('2d');

const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [
            {
                label: 'Binomial Distribution',
                data: [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Normal Approximation',
                data: [],
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
                type: 'line',
                fill: false
            }
        ]
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
    const n = parseInt(document.getElementById('n').value);
    const p = parseFloat(document.getElementById('p').value);

    const mean = n * p;
    const variance = n * p * (1 - p);
    const stddev = Math.sqrt(variance);

    const binomialData = [];
    const normalData = [];
    const labels = [];

    for (let k = 0; k <= n; k++) {
        const binomProb = binomialProbability(n, k, p);
        binomialData.push(binomProb);
        labels.push(k);
        
        if (n > 30) { // Threshold for normal approximation
            const normalProb = normalProbability(k, mean, stddev);
            normalData.push(normalProb);
        } else {
            normalData.push(null); // No normal data for small n
        }
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = binomialData;
    chart.data.datasets[1].data = normalData;
    chart.update();

    document.getElementById('normalExplanation').style.display = n > 30 ? 'block' : 'none';
    updateEquation(n, p, mean, stddev);
    updateSliderValues(n, p);
}

function binomialProbability(n, k, p) {
    return (factorial(n) / (factorial(k) * factorial(n - k))) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

function normalProbability(x, mean, stddev) {
    const z = (x - mean) / stddev;
    return (1 / (stddev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow(z, 2));
}

function factorial(num) {
    return num <= 1 ? 1 : num * factorial(num - 1);
}

function updateEquation(n, p, mean, stddev) {
    const k = "k"; // Placeholder for number of successes
    const equation = `P(X = k) = \\binom{${n}}{k} \\cdot ${p}^k \\cdot (1 - ${p})^{${n} - k}`;
    document.getElementById('distributionEquation').innerHTML = `\\[ ${equation} \\]`;
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, "distributionEquation"]);

    document.getElementById('meanValue').textContent = `${mean.toFixed(2)}`;
    document.getElementById('stddevValue').textContent = `${stddev.toFixed(2)}`;
}

function updateSliderValues(n, p) {
    document.getElementById('nValue').textContent = n;
    document.getElementById('pValue').textContent = p.toFixed(2);
}

document.getElementById('n').addEventListener('input', updateChart);
document.getElementById('p').addEventListener('input', updateChart);

updateChart();
