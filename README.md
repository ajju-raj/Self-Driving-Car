# Self-Driving Car using Neural Networks

This project is a simple self-driving car simulation using a small neural network. The neural network learns to drive a car on a road by interpreting visual inputs (from the car's sensors) and using them to make decisions on how to steer the car.

## Overview

The self-driving car system consists of several components:
- A neural network that controls the car's movement.
- A visualizer that allows you to track the car's position, the neural network's performance, and the road.
- Sensors that gather information about the car's surroundings.
- Buttons for saving and discarding training sessions.

The project is built using HTML5, JavaScript, and a small neural network architecture to drive the car autonomously.

## Features
- **Neural Network-based Driving**: A small neural network is trained to drive the car by processing visual data (sensors).
- **Visualizer**: Real-time feedback on the car's movement, neural network, and road conditions.
- **Road Simulation**: The car is simulated on a track with various road conditions and obstacles.
- **Save and Discard Options**: Save or discard the current training session.

## Getting Started

### Prerequisites

Before you can run the project, you need the following:

- A modern web browser (Chrome, Firefox, or Safari recommended).
- Basic understanding of JavaScript and neural networks.

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/ajju-raj/self-driving-car.git
    cd self-driving-car
    ```

2. Open the `index.html` file in your browser to run the simulation:

    ```bash
    open index.html
    ```

### Project Structure

- `index.html`: Main HTML file that sets up the car simulation interface.
- `car.png`: Image of the car used in the simulation.
- `style.css`: Custom styles for the simulation interface (e.g., car canvas, buttons).
- `visualizer.js`: Contains code to visualize the car's movement, neural network, and training progress.
- `network.js`: Implements the neural network that drives the car, including the training and evaluation logic.
- `sensor.js`: Handles sensor data that the car uses to understand its environment.
- `utils.js`: Utility functions for various tasks like random number generation and normalization.
- `road.js`: Defines the road and obstacles the car will navigate.
- `controls.js`: Implements manual controls for the car (if needed).
- `car.js`: Defines the car's model, including movement, acceleration, and steering.
- `main.js`: Main script to initialize and run the simulation.
- `view-1.png, view-2.png`: Screenshot of the simulation interface.

### How to Use

1. **Run the Simulation**:
    - Open the `index.html` file in your browser.
    - The car will begin on the road, controlled by the neural network.

2. **Training**:
    - The neural network will learn over time based on the training data generated during simulation.
    - If you want to manually control the car, you can use the provided controls.

3. **Save and Discard**:
    - Use the save button (💾) to save the current training session.
    - Use the discard button (🗑️) to discard the current session.

### How the Neural Network Works

- The neural network used in this project is a small model designed to process sensor inputs and output steering commands (left, right, straight).
- The network is trained on data generated from the car's movements and sensor feedback during driving.

### Customization

You can modify the network structure in `network.js` to experiment with different neural network architectures. You can also adjust the training parameters and road conditions to see how they affect the car's performance.

### Contributions

Feel free to fork this project, make modifications, and submit pull requests! Contributions are always welcome.

---

### License

This project is open source feel free to use and modify the code as required.

---

### Contact

For any questions or issues, feel free to reach out via email or open an issue on GitHub.

---
