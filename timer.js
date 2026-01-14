const timerDisplay = document.getElementById("timerDisplay");
const inputBox = document.getElementById("quote-input");

let timeLeft = 60;
let isRunning = false;
let timerInterval;

function startTimer() {
    if (isRunning) return;

    isRunning = true;

    timerInterval = setInterval(function () {
        timeLeft--;

        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerDisplay.textContent = "⛔";
            inputBox.disabled = true;
            isRunning = false;
            document.dispatchEvent(new Event('timerEnded'));
        }
    }, 1000);
}

export function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    isRunning = false;
    timerDisplay.textContent = timeLeft;
    inputBox.disabled = false;
}

document.getElementById('resetBtn')?.addEventListener('click', () => {
    resetTimer();
});

inputBox.addEventListener("input", startTimer);

document.addEventListener('timerEnded', () => {
    document.dispatchEvent(new Event('typingTestEnded'));
});