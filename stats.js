class StatsManager {
    constructor() {
        const savedStats = localStorage.getItem('typingStats');
        if (savedStats) {
            this.history = JSON.parse(savedStats);
        } else {
            this.history = [];
        }
    }

    saveAttempt(wpm, accuracy) {
        this.history.push({
            wpm,
            accuracy,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('typingStats', JSON.stringify(this.history));
    }

    getLatestAttempt() {
        return this.history[this.history.length - 1];
    }

    checkImprovement() {
        if (this.history.length < 2) return false;

        let last = this.history[this.history.length - 1];
        let prev = this.history[this.history.length - 2];

        return last.wpm > prev.wpm && last.accuracy > prev.accuracy;
    }

    getAllAttempts() {
        return this.history;
    }

    getWpmData() {
        return this.history.map(attempt => attempt.wpm);
    }

    getAccuracyData() {
        return this.history.map(attempt => attempt.accuracy);
    }

    updateDisplays(wpm, accuracy) {
        const wpmDisplay = document.getElementById('wpmDisplay');
        const accuracyDisplay = document.getElementById('accuracyDisplay');

        wpmDisplay.textContent = `WPM: ${wpm}`;
        accuracyDisplay.textContent = `Accuracy: ${accuracy}%`;

        const hasImproved = this.checkImprovement();
        const improvementDisplay = document.getElementById('improvementDisplay');

        if (improvementDisplay) {
            if (hasImproved) {
                improvementDisplay.textContent = "You improved!";
            } else {
                improvementDisplay.textContent = "Keep practicing!";
            }
            improvementDisplay.style.display = "block";
        }
    }
}

export { StatsManager };
