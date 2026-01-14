# Typing Speed Tester

A web application to test and improve your typing speed and accuracy.

## Features

- 60-second typing tests with random word generation
- Real-time typing feedback with text highlighting
- Calculation of WPM (Words Per Minute) and accuracy metrics
- Performance tracking with visual charts
- Keyboard shortcuts for quick test reset and management

## How to Use

1. Start typing the displayed text in the input box
2. The timer automatically starts when you begin typing
3. After 60 seconds, your results will be displayed
4. View your performance history in the chart below
5. Press `Enter` to start a new test or `Esc` to reset your input

## Keyboard Shortcuts

- `Enter`: Start a new test with fresh text
- `Escape`: Reset your current input without starting over

## Project Structure

- `index.html` - Main HTML structure and UI elements
- `styles.css` - Styling for the application
- `main.js` - Core application logic and event handling
- `tester.js` - Typing test engine and metrics calculation
- `fetch.js` - Text fetching from random word API
- `stats.js` - Statistics tracking and management
- `highlight.js` - Text highlighting for visual feedback
- `chart.js` - Performance visualization with charts
- `timer.js` - Timer functionality for the tests

## Technical Details

- Built with vanilla JavaScript (ES6+)
- Modular design with ES6 modules
- Uses Chart.js for data visualization
- Fetches random words from external API
- Stores performance data in browser's localStorage
