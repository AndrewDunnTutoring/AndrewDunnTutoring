// Set up the canvas and context
const cartesianCanvas = document.getElementById("cartesian-graph");
const polarCanvas = document.getElementById("polar-graph");
const cartesianCtx = cartesianCanvas.getContext("2d");
const polarCtx = polarCanvas.getContext("2d");

const width = cartesianCanvas.width;
const height = cartesianCanvas.height;
const centerX = width / 2;
const centerY = height / 2;
const scaleX = 30; // Adjusted scale for better visibility
const scaleY = 100;
const step = 0.01; // Step size for drawing
const minX = -4 * Math.PI; // Start bound for x-axis
const maxX = 4 * Math.PI; // End bound for x-axis
const interval = 20; // Interval for animation frames
let animationFrame;
let t = 0;

// Function to draw axes
function drawAxes(ctx, xLabel, yLabel) {
    ctx.beginPath();
    ctx.moveTo(0, centerY); // x-axis
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0); // y-axis
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.font = "16px Arial";
    ctx.fillText(xLabel, width - 30, centerY + 20);
    ctx.fillText(yLabel, centerX + 10, 20);
}

// Function to draw the Cartesian graph y = sin(2x)
function drawCartesian() {
    cartesianCtx.clearRect(0, 0, width, height);
    drawAxes(cartesianCtx, "x", "y");
    cartesianCtx.beginPath();
    for (let x = minX; x <= maxX; x += step) {
        const y = Math.sin(2 * x);
        const px = centerX + x * scaleX;
        const py = centerY - y * scaleY;
        cartesianCtx.lineTo(px, py);
    }
    cartesianCtx.strokeStyle = "blue";
    cartesianCtx.lineWidth = 2;
    cartesianCtx.stroke();
}

// Function to draw the polar graph r = sin(2θ)
function drawPolar() {
    polarCtx.clearRect(0, 0, width, height);
    drawAxes(polarCtx, "θ", "r");
}

// Function to animate the dot and draw the polar curve
function animate() {
    if (t <= 2 * Math.PI) {
        cartesianCtx.clearRect(0, 0, width, height);
        drawCartesian();

        polarCtx.clearRect(0, 0, width, height);
        drawPolar();

        // Draw dot on Cartesian graph
        const y = Math.sin(2 * t);
        const x = t;
        const dotX = centerX + x * scaleX;
        const dotY = centerY - y * scaleY;

        cartesianCtx.beginPath();
        cartesianCtx.arc(dotX, dotY, 5, 0, 2 * Math.PI);
        cartesianCtx.fillStyle = "red";
        cartesianCtx.fill();

        // Draw the polar curve incrementally
        polarCtx.beginPath();
        const points = [];
        for (let theta = 0; theta <= t; theta += step) {
            const r = Math.sin(2 * theta);
            const polarX = centerX + r * Math.cos(theta) * scaleY;
            const polarY = centerY - r * Math.sin(theta) * scaleY;
            points.push({ x: polarX, y: polarY });
        }
        points.forEach((point, index) => {
            if (index === 0) {
                polarCtx.moveTo(point.x, point.y);
            } else {
                polarCtx.lineTo(point.x, point.y);
            }
        });
        polarCtx.strokeStyle = "red";
        polarCtx.lineWidth = 2;
        polarCtx.stroke();

        // Move the dot
        t += step;
        animationFrame = setTimeout(animate, interval);
    } else {
        clearTimeout(animationFrame);
    }
}

// Initial drawing
drawCartesian();
drawPolar();

// Event listener for the animate button
document.getElementById("animate-button").addEventListener("click", function() {
    t = 0; // Reset parameter
    animate();
});
