document.addEventListener('DOMContentLoaded', () => {
    const methodSelect = document.getElementById('method');
    const numIntervalsInput = document.getElementById('num-intervals');
    const numIntervalsDisplay = document.getElementById('num-intervals-display');
    const estimatedAreaDisplay = document.getElementById('estimated-area');
    const exactAreaDisplay = document.getElementById('exact-area');
    const errorDisplay = document.getElementById('error');
    let method = methodSelect.value;
    let numIntervals = parseInt(numIntervalsInput.value);

    // Function to calculate the exact area
    function exactArea() {
        const start = 0;
        const end = 5 * Math.PI / 6;
        const func = x => Math.sin(x);
        const exactValue = -Math.cos(end) - (-Math.cos(start));
        return exactValue;
    }

    // Function to calculate the estimated area using the selected method
    function calculateArea() {
        const func = x => Math.sin(x); // Example function f(x) = sin(x)
        const a = 0; // Start of the interval
        const b = 5*Math.PI/6; // End of the interval
        const deltaX = (b - a) / numIntervals;
        let area = 0;

        if (method === 'left') {
            for (let i = 0; i < numIntervals; i++) {
                area += func(a + i * deltaX) * deltaX;
            }
        } else if (method === 'right') {
            for (let i = 1; i <= numIntervals; i++) {
                area += func(a + i * deltaX) * deltaX;
            }
        } else if (method === 'midpoint') {
            for (let i = 0; i < numIntervals; i++) {
                area += func(a + (i + 0.5) * deltaX) * deltaX;
            }
        } else if (method === 'trapezoidal') {
            for (let i = 0; i < numIntervals; i++) {
                area += (func(a + i * deltaX) + func(a + (i + 1) * deltaX)) * deltaX / 2;
            }
        }

        return area;
    }

    // Function to draw the graph and rectangles/trapezoids
    function drawGraph() {
        const x = [];
        const y = [];
        const shapes = [];
        const dots = [];
        const func = x => Math.sin(x); // Example function f(x) = sin(x)
        const a = 0;
        const b = 5*Math.PI/6;
        const deltaX = (b - a) / numIntervals;

        // Generate function data
        for (let i = -500; i <= 1500; i++) { // Extend beyond the domain
            x.push(-Math.PI / 2 + (2 * Math.PI) * i / 1000);
            y.push(func(x[x.length - 1]));
        }

        // Generate rectangles/trapezoids data
        for (let i = 0; i < numIntervals; i++) {
            let xPos = a + i * deltaX;
            let xNextPos = a + (i + 1) * deltaX;
            let yPos = func(xPos);
            let yNextPos = func(xNextPos);

            if (method === 'left') {
                shapes.push({
                    x0: xPos, x1: xNextPos, y0: 0, y1: yPos,
                    line: { color: 'darkred', width: 1 }
                });
                dots.push({ x: xPos, y: yPos }); // Left-hand sum dot
            } else if (method === 'right') {
                shapes.push({
                    x0: xPos, x1: xNextPos, y0: 0, y1: yNextPos,
                    line: { color: 'darkred', width: 1 }
                });
                dots.push({ x: xNextPos, y: yNextPos }); // Right-hand sum dot
            } else if (method === 'midpoint') {
                let xMid = xPos + deltaX / 2;
                let yMid = func(xMid);
                shapes.push({
                    x0: xPos, x1: xNextPos, y0: 0, y1: yMid,
                    line: { color: 'darkred', width: 1 }
                });
                dots.push({ x: xMid, y: yMid }); // Midpoint sum dot
            } else if (method === 'trapezoidal') {
                shapes.push({
                    x0: xPos, x1: xNextPos, y0: 0, y1: yPos, y2: yNextPos,
                    line: { color: 'darkred', width: 1 }
                });
                dots.push({ x: xPos, y: yPos }); // Left-hand sum dot
                dots.push({ x: xNextPos, y: yNextPos }); // Right-hand sum dot
            }
        }

        // Plot the graph
        Plotly.newPlot('graph', [
            {
                x: x,
                y: y,
                mode: 'lines',
                name: 'f(x)',
                line: { color: 'blue' }
            },
            {
                x: shapes.flatMap(shape => (shape.y2 !== undefined ? [shape.x0, shape.x1, shape.x1, shape.x0, shape.x0, null] : [shape.x0, shape.x1, shape.x1, shape.x0, shape.x0, null])),
                y: shapes.flatMap(shape => (shape.y2 !== undefined ? [0, 0, shape.y2, shape.y1, 0, null] : [0, 0, shape.y1, shape.y1, 0, null])),
                fill: 'tozeroy',
                fillcolor: 'rgba(255, 100, 100, 0.5)',
                line: { color: 'darkred', width: 1 }, // Light frames
                name: 'Blocks'
            },
            {
                x: dots.flatMap(dot => [dot.x, null]),
                y: dots.flatMap(dot => [dot.y, null]),
                mode: 'markers',
                marker: {
                    color: 'black',
                    size: 5, // Updated size
                    symbol: 'circle'
                },
                name: 'Height'
            },
            {
                x: [0, 5*Math.PI/6],
                y: [0, 0],
                mode: 'markers',
                marker: {
                    color: 'black',
                    size: 10,
                    symbol: 'circle'
                },
                name: 'Bounds'
            }
        ], {
            title: '',
            xaxis: {
                range: [-Math.PI / 2, 3 * Math.PI / 2],
                tickvals: [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI, 3 * Math.PI / 4, Math.PI / 2, 5 * Math.PI / 4, 3 * Math.PI / 2],
                ticktext: ['-π/2', '-π/4', '0', 'π/4', 'π', '3π/4', 'π/2', '5π/4', '3π/2'], // Added π/2
                title: 'x',
                showline: true,
                linecolor: 'white', // White line for x-axis
                linewidth: 2,
                showgrid: true, // Show minor grid lines
                gridcolor: 'lightgray',
                gridwidth: 0.5, // Thin grid lines
                zeroline: true,
                zerolinecolor: 'black', // Black zero line
                zerolinewidth: 2,
                ticklen: 6,
                ticks: 'outside'
            },
            yaxis: {
                range: [-1, 1],
                title: 'f(x)',
                showline: true,
                linecolor: 'white', // White line for y-axis
                linewidth: 2,
                showgrid: true, // Show minor grid lines
                gridcolor: 'lightgray',
                gridwidth: 0.5, // Thin grid lines
                zeroline: true,
                zerolinecolor: 'black', // Black zero line
                zerolinewidth: 2,
                ticklen: 6,
                ticks: 'outside'
            }
        });
    }

    // Initial plot
    drawGraph();
    exactAreaDisplay.textContent = exactArea().toFixed(4);
    estimatedAreaDisplay.textContent = calculateArea().toFixed(4);
    errorDisplay.textContent = Math.abs(calculateArea() - exactArea()).toFixed(4);

    // Update plot and values on user input
    methodSelect.addEventListener('change', () => {
        method = methodSelect.value;
        drawGraph();
        estimatedAreaDisplay.textContent = calculateArea().toFixed(4);
        errorDisplay.textContent = Math.abs(calculateArea() - exactArea()).toFixed(4);
    });

    numIntervalsInput.addEventListener('input', () => {
        numIntervals = parseInt(numIntervalsInput.value);
        numIntervalsDisplay.textContent = numIntervals;
        drawGraph();
        estimatedAreaDisplay.textContent = calculateArea().toFixed(4);
        errorDisplay.textContent = Math.abs(calculateArea() - exactArea()).toFixed(4);
    });
});
