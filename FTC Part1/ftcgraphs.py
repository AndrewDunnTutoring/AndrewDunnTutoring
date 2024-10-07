import matplotlib.pyplot as plt
import numpy as np

# Define the cubic function
def f(t):
    return -t**3 + 3*t**2 - 2*t

# Define the bounds
a = -0.5
x = 1
h = 1
c = 1.270  # Given point c for the Mean Value Theorem

# Create x values and calculate y values
t = np.linspace(a - 1, x + h + 1, 400)
y = f(t)

# Define a common figure style
plt.style.use('seaborn-darkgrid')

# Helper function to set plot properties
def set_plot_properties():
    plt.ylim(-1, 1)
    plt.axhline(0, color='black', linewidth=1)
    plt.axvline(0, color='black', linewidth=1)
    plt.gca().spines['top'].set_visible(False)
    plt.gca().spines['right'].set_visible(False)
    plt.gca().spines['left'].set_visible(False)
    plt.gca().spines['bottom'].set_linewidth(2)
    plt.gca().spines['left'].set_linewidth(2)
    plt.gca().xaxis.set_tick_params(width=2)
    plt.gca().yaxis.set_tick_params(width=0)  # Hide y-axis ticks
    plt.xticks([x, x + h], ['$x$', '$x+h$'])
    plt.yticks([])  # Remove y-axis labels

# Step 1: Graph of cubic function with bounds "a" and "x"
plt.figure(figsize=(8, 6))
plt.plot(t, y, label='$f(t) = -t^3 + 3t^2 - 2t$', color='blue')
plt.axvline(a, color='r', linestyle='--', label='$a$')
plt.axvline(x, color='g', linestyle='--', label='$x$')
plt.fill_between(t, y, where=(a <= t) & (t <= x), color='gray', alpha=0.3)
set_plot_properties()
plt.title('Graph of $f(t)$ with Bounds $a$ and $x$')
plt.legend()
# plt.savefig('graph_step1.png')  # Uncomment to save
# plt.show()

# Step 2: Graph with area shaded from a to x and darker from x to x+h
plt.figure(figsize=(8, 6))
plt.plot(t, y, label='$f(t) = -t^3 + 3t^2 - 2t$', color='blue')
plt.axvline(x, color='g', linestyle='--', label='$x$')
plt.axvline(x + h, color='b', linestyle='--', label='$x+h$')
plt.fill_between(t, y, where=(a <= t) & (t <= x), color='gray', alpha=0.3)
plt.fill_between(t, y, where=(x <= t) & (t <= x + h), color='gray', alpha=0.6)
set_plot_properties()
plt.title('Graph with Area Shaded from $a$ to $x$ and Darker from $x$ to $x+h$')
plt.legend()
# plt.savefig('graph_step2.png')  # Uncomment to save
# plt.show()

# Step 3: Highlight the strip of area between x and x+h
plt.figure(figsize=(8, 6))
plt.plot(t, y, label='$f(t) = -t^3 + 3t^2 - 2t$', color='blue')
plt.axvline(x, color='g', linestyle='--', label='$x$')
plt.axvline(x + h, color='b', linestyle='--', label='$x+h$')
plt.fill_between(t, y, where=(x <= t) & (t <= x + h), color='gray', alpha=0.3)
set_plot_properties()
plt.title('Strip of Area between $x$ and $x+h$')
plt.legend()
# plt.savefig('graph_step3.png')  # Uncomment to save
# plt.show()

# Step 4: Show point c and the rectangle area with bounds x and x+h
plt.figure(figsize=(8, 6))
plt.plot(t, y, label='$f(t) = -t^3 + 3t^2 - 2t$', color='blue')
plt.axvline(x, color='g', linestyle='--', label='$x$')
plt.axvline(x + h, color='b', linestyle='--', label='$x+h$')
plt.axvline(c, color='orange', linestyle='--', label='$c$')
plt.fill_between(t, y, where=(x <= t) & (t <= x + h), color='gray', alpha=0.3)
plt.bar(x + h/2, f(c), width=h, color='red', alpha=0.5, edgecolor='black', label='$f(c) \cdot (x+h-x)$')
set_plot_properties()
plt.title('Point $c$ and Rectangle with Area $f(c) \cdot (x+h-x)$')
plt.legend()
# plt.savefig('graph_step4.png')  # Uncomment to save
# plt.show()



# Define the bounds for the fifth picture
x = 1
h = 0.5  # New h value (reduced to 0.5)
new_c = 1.2311  # New c value

# Create x values and calculate y values
t = np.linspace(x - 1, x + h + 1, 400)
y = f(t)

# Helper function to set plot properties
def set_plot_properties():
    plt.ylim(-1, 1)
    plt.axhline(0, color='black', linewidth=1)
    plt.axvline(0, color='black', linewidth=1)
    plt.gca().spines['top'].set_visible(False)
    plt.gca().spines['right'].set_visible(False)
    plt.gca().spines['left'].set_visible(False)
    plt.gca().spines['bottom'].set_linewidth(2)
    plt.gca().spines['left'].set_linewidth(2)
    plt.gca().xaxis.set_tick_params(width=2)
    plt.gca().yaxis.set_tick_params(width=0)  # Hide y-axis ticks
    plt.xticks([x, x + h], ['$x$', '$x+h$'])
    plt.yticks([])  # Remove y-axis labels

# Step 5: Show the area between x and x+h and the new c value
plt.figure(figsize=(8, 6))
plt.plot(t, y, label='$f(t) = -t^3 + 3t^2 - 2t$', color='blue')
plt.axvline(x, color='g', linestyle='--', label='$x$')
plt.axvline(x + h, color='b', linestyle='--', label='$x+h$')
plt.axvline(new_c, color='orange', linestyle='--', label='new $c$')
plt.fill_between(t, y, where=(x <= t) & (t <= x + h), color='gray', alpha=0.3)
# Draw the rectangle with precise x bounds of [x, x+h]
plt.fill_between([x, x + h], [f(new_c), f(new_c)], color='red', alpha=0.5, edgecolor='black', label='Area = $f(c) \cdot (x+h-x)$')
set_plot_properties()
plt.title('Area between $x$ and $x+h$ with smaller $h$ value and corresponding $c$ value')
plt.legend()
plt.savefig('graph_step5.png')  # Uncomment to save
plt.show()