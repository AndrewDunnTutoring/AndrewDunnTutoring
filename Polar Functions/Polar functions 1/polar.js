// Set up the canvas and context
const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");

// Graphing parameters
const width = canvas.width;
const height = canvas.height;
const centerX = width / 2;
const centerY = height / 2;
const scaleX = 50; // Scaling for x-axis
const scaleY = 100; // Scaling for y-axis
const step = 0.01; // Step size for drawing
const maxTheta = 2 * Math.PI;
let animationFrame;

// Function to draw the axes
function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, centerY); // x-axis
    ctx.lineTo(width, centerY);
    ctx.moveTo(centerX, 0); // y-axis
    ctx.lineTo(centerX, height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
}

// Function to draw the Cartesian graph y = sin(2x)
function drawCartesian() {
    ctx.clearRect(0, 0, width, height);
    drawAxes();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    for (let x = 0; x <= 2 * Math.PI; x += step) {
        const y = Math.sin(2 * x);
        ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY);
    }
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Function to reflect the Cartesian curve and wind it around the origin
function animateTransformation() {
    let t = 0;
    const maxT = 1.5 * Math.PI; // Animation duration for winding

    function drawFrame() {
        if (t <= maxT) {
            ctx.clearRect(0, 0, width, height);
            drawAxes();
            ctx.beginPath();

            for (let x = 0; x <= 2 * Math.PI; x += step) {
                const y = Math.sin(2 * x);

                // Reflect about y = x to become x = sin(2y)
                const reflectedX = y;
                const reflectedY = x;

                // Compute the polar angle and radius
                const theta = (reflectedY / (2 * Math.PI)) * maxTheta; // Adjust angle based on reflection
                const r = Math.sin(2 * theta);

                // Calculate the polar coordinates
                const polarX = r * Math.cos(theta);
                const polarY = r * Math.sin(theta);

                // Rotate and scale the reflected curve to fit the polar plot
                const angle = (t / maxT) * 2 * Math.PI;
                const rotatedX = polarX * Math.cos(angle) - polarY * Math.sin(angle);
                const rotatedY = polarX * Math.sin(angle) + polarY * Math.cos(angle);

                // Draw the interpolated curve
                const interpX = centerX + rotatedX * scaleY;
                const interpY = centerY - rotatedY * scaleY;

                if (x === 0) {
                    ctx.moveTo(interpX, interpY);
                } else {
                    ctx.lineTo(interpX, interpY);
                }
            }
            ctx.strokeStyle = "red";
            ctx.lineWidth = 2;
            ctx.stroke();

            t += 0.05;
            animationFrame = requestAnimationFrame(drawFrame);
        } else {
            cancelAnimationFrame(animationFrame);
        }
    }

    drawFrame();
}

// Initially draw the Cartesian graph and axes
drawCartesian();

// Event listener for the transform button
document.getElementById("transform-button").addEventListener("click", function() {
    document.getElementById("equation").textContent = "r = sin(2θ)";
    animateTransformation();
});
