import numpy as np
import matplotlib.pyplot as plt

# Define the functions
def f(x):
    return (np.exp(x) - 1) / x

def exp_x(x):
    return np.exp(x)

def x_func(x):
    return x

# Generate x values
x = np.linspace(-2, 2, 400)
x_safe = x[x != 0]  # Avoid division by zero

# Plot the functions
plt.figure(figsize=(10, 8))
plt.plot(x_safe, f(x_safe), color='purple', label=r'$\frac{e^x - 1}{x}$')
plt.plot(x, exp_x(x), color='lightcoral', label=r'$e^x$')
plt.plot(x, x_func(x), color='lightcoral', label=r'$x$')

# Add a hole at (0,1)
plt.scatter([0], [1], color='black', edgecolor='black', s=200, zorder=5, label='Hole (0,1)')
plt.scatter([0], [1], color='white', s=150, zorder=6)

# Set axis limits
plt.xlim(-2, 2)
plt.ylim(-1, 3)

# Add grid, labels, and legend
plt.axhline(0, color='black', linewidth=1.5)
plt.axvline(0, color='black', linewidth=1.5)
plt.grid(True)
plt.xlabel('x')
plt.ylabel('y')
plt.title(r'Plot of $\frac{e^x - 1}{x}$, $e^x$, and $x$')
plt.legend()
# plt.savefig('e-graph.png')
plt.show()
