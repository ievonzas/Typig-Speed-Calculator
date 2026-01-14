export class TypingTest {
    constructor(text) {
        this.textToType = text;
        this.typedText = '';
        this.startTime = null;
        this.timer = null;
        this.testDuration = 60;
        this.currentPosition = 0;
        this.correctCharacters = 0;
        this.totalCharacters = 0;
        this.onTestEnd = null;
    }

    start(onTestEnd) {
        this.startTime = Date.now();

        if (typeof onTestEnd === 'function') {
            this.onTestEnd = onTestEnd;
        }

        this.timer = setTimeout(() => {
            this.end();
            if (this.onTestEnd) {
                this.onTestEnd();
            }
        }, this.testDuration * 1000);
    }

    type(character) {
        if (this.currentPosition >= this.textToType.length) {
            return;
        }

        if (character !== ' ') {
            this.totalCharacters++;

            if (character === this.textToType[this.currentPosition]) {
                this.correctCharacters++;
            }
        } else if (character === ' ' && this.textToType[this.currentPosition] === ' ') {

        }

        this.typedText += character;
        this.currentPosition++;
    }

    backspace() {
        if (this.currentPosition > 0) {

            const deletedChar = this.typedText[this.typedText.length - 1];
            const expectedChar = this.textToType[this.currentPosition - 1];

            if (deletedChar !== ' ') {
                this.totalCharacters--;

                if (deletedChar === expectedChar) {
                    this.correctCharacters--;
                }
            }

            this.currentPosition--;
            this.typedText = this.typedText.slice(0, -1);
        }
    }

    end() {
        clearTimeout(this.timer);
    }
    getWPM() {
        let minutes = this.testDuration / 60;
        let words = this.correctCharacters / 6;
        return Math.round(words / minutes);
    }

    getAccuracy() {
        if (this.totalCharacters === 0) {
            return 0;
        }

        let accuracy = (this.correctCharacters / this.totalCharacters) * 100;
        return Math.round(accuracy);
    }
}
