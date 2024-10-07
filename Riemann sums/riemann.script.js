document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    let method = "left";
    let numIntervals = 10;
    let selectedFunction = "sin(x)";
    let lowerBound = 0;
    let upperBound = Math.PI * 5 / 6;

    // Parse function and bounds input
    function parseFunctionAndBounds() {
        try {
            selectedFunction = document.getElementById("function-input").innerText.trim();
            lowerBound = math.evaluate(document.getElementById("lower-bound").innerText.trim());
            upperBound = math.evaluate(document.getElementById("upper-bound").innerText.trim());
        } catch (error) {
            console.error("Error parsing function or bounds:", error);
            selectedFunction = "sin(x)";
            lowerBound = 0;
            upperBound = Math.PI * 5 / 6;
        }
        drawGraph();
        updateResults();
    }

    // Evaluate user-defined function
    function evalFunction(x) {
        try {
            return math.evaluate(selectedFunction, { x });
        } catch (e) {
            console.error("Error evaluating function:", e);
            return NaN;
        }
    }

    // Draw graph function
    function drawGraph() {
        // Generate function points
        let xValues = [];
        let yValues = [];
        let rectX = [];
        let rectY = [];
        let rectTops = []; // For trapezoidal tops

        const deltaX = (upperBound - lowerBound) / numIntervals;
        for (let x = lowerBound - Math.PI / 2; x <= upperBound + Math.PI / 2; x += 0.01) {
            xValues.push(x);
            yValues.push(evalFunction(x));
        }

        for (let i = 0; i < numIntervals; i++) {
            let x = lowerBound + i * deltaX;
            let y, yNext;
            switch (method) {
                case "left":
                    y = evalFunction(x);
                    rectX.push(x);
                    rectY.push(y);
                    rectTops.push(y);
                    break;
                case "right":
                    y = evalFunction(x + deltaX);
                    rectX.push(x);
                    rectY.push(y);
                    rectTops.push(y);
                    break;
                case "midpoint":
                    y = evalFunction(x + deltaX / 2);
                    rectX.push(x + deltaX / 2);
                    rectY.push(y);
                    rectTops.push(y);
                    break;
                case "trapezoidal":
                    y = evalFunction(x);
                    yNext = evalFunction(x + deltaX);
                    rectX.push(x);
                    rectY.push((y + yNext) / 2);
                    rectTops.push(yNext);
                    break;
            }
        }

        // Plot data
        let functionPlot = {
            x: xValues,
            y: yValues,
            mode: "lines",
            name: "f(x)",
            line: { color: "blue" }
        };

        let rectPlot = {
            x: method === "midpoint" ? rectX.map(x => x - deltaX / 2) : rectX,
            y: method === "trapezoidal" ? rectY : rectY.map(y => Math.max(0, y)),
            type: method === "trapezoidal" ? "scatter" : "bar",
            mode: method === "trapezoidal" ? "lines+markers" : undefined,
            fill: method === "trapezoidal" ? "tozeroy" : undefined,
            width: method === "midpoint" ? deltaX : undefined,
            name: "Blocks",
            marker: { color: "rgba(255, 0, 0, 0.5)", line: { color: "darkred", width: 1 } },
            line: method === "trapezoidal" ? { shape: "vh" } : undefined
        };

        let trapezoidTops = {
            x: rectX.flatMap((x, i) => [x, x + deltaX]),
            y: rectTops.flatMap((y, i) => [evalFunction(rectX[i]), rectTops[i]]),
            mode: "lines",
            line: { color: "darkred", width: 1 },
            showlegend: false,
            fill: "tozeroy",
            fillcolor: "rgba(255, 0, 0, 0.5)"
        };

        let heightMarkers = {
            x: rectX.map((x, i) => {
                switch (method) {
                    case "left":
                        return x;
                    case "right":
                        return x + deltaX;
                    case "midpoint":
                        return x;
                    case "trapezoidal":
                        return [x, x + deltaX];
                }
            }).flat(),
            y: rectY.map((y, i) => {
                switch (method) {
                    case "left":
                    case "right":
                    case "midpoint":
                        return y;
                    case "trapezoidal":
                        return [evalFunction(rectX[i]), rectTops[i]];
                }
            }).flat(),
            mode: "markers",
            name: "Height",
            marker: { color: "black", size: 5 }
        };

        let layout = {
            xaxis: {
                title: "x",
                range: [lowerBound - Math.PI / 2, upperBound + Math.PI / 2],
                showgrid: true,
                zeroline: true,
                zerolinecolor: "black",
                linecolor: "white",
                linewidth: 2,
                tickvals: [lowerBound, upperBound, Math.PI / 2, 5 * Math.PI / 4],
                ticktext: ["0", `\\(\\frac{5\\pi}{6}\\)`, "\\(\\frac{\\pi}{2}\\)", "\\(\\frac{5\\pi}{4}\\)"]
            },
            yaxis: {
                title: "f(x)",
                zeroline: true,
                zerolinecolor: "black",
                linecolor: "white",
                linewidth: 2
            },
            shapes: [
                {
                    type: "circle",
                    xref: "x",
                    yref: "y",
                    x0: lowerBound - 0.01,
                    y0: evalFunction(lowerBound) - 0.01,
                    x1: lowerBound + 0.01,
                    y1: evalFunction(lowerBound) + 0.01,
                    line: { color: "black" },
                    fillcolor: "black"
                },
                {
                    type: "circle",
                    xref: "x",
                    yref: "y",
                    x0: upperBound - 0.01,
                    y0: evalFunction(upperBound) - 0.01,
                    x1: upperBound + 0.01,
                    y1: evalFunction(upperBound) + 0.01,
                    line: { color: "black" },
                    fillcolor: "black"
                }
            ]
        };

        let data = [functionPlot, rectPlot, heightMarkers];
        if (method === "trapezoidal") data.push(trapezoidTops);
        Plotly.newPlot("graph", data, layout);
    }

    // Update results
    function updateResults() {
        let estimatedArea = 0;
        const deltaX = (upperBound - lowerBound) / numIntervals;
        for (let i = 0; i < numIntervals; i++) {
            let x = lowerBound + i * deltaX;
            let y;
            switch (method) {
                case "left":
                    y = evalFunction(x);
                    break;
                case "right":
                    y = evalFunction(x + deltaX);
                    break;
                case "midpoint":
                    y = evalFunction(x + deltaX / 2);
                    break;
                case "trapezoidal":
                    y = (evalFunction(x) + evalFunction(x + deltaX)) / 2;
                    break;
            }
            estimatedArea += y * deltaX;
        }

        let exactArea;
        if (selectedFunction === "sin(x)") {
            exactArea = -Math.cos(upperBound) + Math.cos(lowerBound);
        } else if (selectedFunction === "x - 1") {
            exactArea = ((upperBound ** 2) / 2) - upperBound - ((lowerBound ** 2) / 2) + lowerBound;
        } else if (selectedFunction === "x^2") {
            exactArea = (upperBound ** 3) / 3 - (lowerBound ** 3) / 3;
        } else if (selectedFunction === "e^x") {
            exactArea = Math.exp(upperBound) - Math.exp(lowerBound);
        } else {
            exactArea = "N/A";
        }

        let error = exactArea !== "N/A" ? Math.abs(exactArea - estimatedArea) : "N/A";

        document.getElementById("estimated-area").innerText = `Estimated area: ${estimatedArea.toFixed(4)}`;
        document.getElementById("exact-area").innerText = `Exact area: ${exactArea === "N/A" ? exactArea : exactArea.toFixed(4)}`;
        document.getElementById("error").innerText = `Error: ${error === "N/A" ? error : error.toFixed(4)}`;
    }

    // Event listeners for user input
    document.getElementById("function-input").addEventListener("blur", parseFunctionAndBounds);
    document.getElementById("lower-bound").addEventListener("blur", parseFunctionAndBounds);
    document.getElementById("upper-bound").addEventListener("blur", parseFunctionAndBounds);
    document.getElementById("method-select").addEventListener("change", function () {
        method = this.value;
        drawGraph();
        updateResults();
    });
    document.getElementById("num-intervals").addEventListener("input", function () {
        numIntervals = parseInt(this.value);
        drawGraph();
        updateResults();
    });

    // Initial drawing of the graph and calculation
    drawGraph();
    updateResults();
});
