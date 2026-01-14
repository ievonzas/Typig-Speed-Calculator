import { TypingTest } from './tester.js';
import { WordsFetcher } from './fetch.js';
import { StatsManager } from './stats.js';
import { TextHighlighter } from './highlight.js';
import { ChartManager } from './chart.js';
import { resetTimer } from './timer.js';

let typingTest;
const statsManager = new StatsManager();
const textDisplay = document.getElementById('textContainer');
const inputField = document.getElementById('quote-input');
const chartContainer = document.getElementById('chart') || document.createElement('div');

const textHighlighter = new TextHighlighter(textDisplay);
const chartManager = new ChartManager(chartContainer);

async function startNewTest() {
    const text = await WordsFetcher.getWordList();
    typingTest = new TypingTest(text);
    textHighlighter.renderText(text);
    inputField.value = '';
    inputField.focus();
}

function updateTextHighlight() {
    textHighlighter.updateHighlight(
        typingTest.typedText,
        typingTest.textToType,
        typingTest.currentPosition
    );
}

function endTest() {
    typingTest.end();

    const wpm = typingTest.getWPM();
    const accuracy = typingTest.getAccuracy();

    statsManager.saveAttempt(wpm, accuracy);
    statsManager.updateDisplays(wpm, accuracy);
    chartManager.updateChart(statsManager.getAllAttempts());
}

inputField.addEventListener('input', function () {
    if (!typingTest.startTime) {
        typingTest.start(function () {
            endTest();
        });
    }

    const char = inputField.value.charAt(inputField.value.length - 1);
    const prevLength = typingTest.typedText.length;

    if (inputField.value.length < prevLength) {
        typingTest.backspace();
    } else {
        typingTest.type(char);
    }

    updateTextHighlight();
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        resetTimer();
        startNewTest();
    }
    else if (e.key === 'Escape') {
        inputField.value = '';
        typingTest.typedText = '';
        updateTextHighlight();
    }
});
document.addEventListener('DOMContentLoaded', function () {
    startNewTest();
    chartManager.showChart();

    document.addEventListener('typingTestEnded', function () {
        endTest();
    });

    const resetButton = document.getElementById('resetBtn');
    if (resetButton) {
        resetButton.addEventListener('click', function () {
            startNewTest();
        });
    }
});
