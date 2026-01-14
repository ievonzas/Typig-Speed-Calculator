export class TextHighlighter {
    constructor(textDisplay) {
        this.textDisplay = textDisplay;
    }

    renderText(text) {
        this.textDisplay.innerHTML = '';
        const fragment = document.createDocumentFragment();

        // const array = Array.from(text);
        // for (let i = 0; i < array.length; i++) {
        // for (let index = 0; index < array.length; index++) {
        // const element = array[index];


        Array.from(text).map(char => {
            const span = document.createElement('span');
            span.textContent = char;
            return span;
        }).forEach(span => fragment.appendChild(span));

        this.textDisplay.appendChild(fragment);
    }

    updateHighlight(typedText, textToType, currentPosition) {
        const spans = this.textDisplay.querySelectorAll('span');
        const wordBoundaries = this.getWordBoundaries(textToType, currentPosition);

        spans.forEach((span, i) => {
            span.className = '';

            if (i < typedText.length) {
                const isCorrect = typedText[i] === textToType[i];
                span.classList.add(isCorrect ? 'correct' : 'incorrect');
            }

            if (wordBoundaries && i >= wordBoundaries.start && i < wordBoundaries.end) {
                span.classList.add('current');
            }
        });
    }
    getWordBoundaries(text, position) {
        if (text[position] === ' ') {
            return null;
        }

        let start = position;
        while (start > 0 && text[start - 1] !== ' ') {
            start--;
        }

        let end = position;
        while (end < text.length && text[end] !== ' ') {
            end++;
        }

        return { start, end };
    }
}
