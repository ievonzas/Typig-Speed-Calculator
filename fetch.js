class WordsFetcher {
    static async getWordList() {
        try {
            let response = await fetch('https://random-word-api.herokuapp.com/word?number=60&length=6');
            if (response.ok) {
                let data = await response.json();
                return data.join(' ');
            } else {
                throw new Error(`Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error while fetching:', error);
            return 'Error loading';
        }
    }

    static processWords(words, processor) {
        if (typeof processor !== 'function') return words;
        return processor(words);
    }
}

async function loadContent() {
    const textContainer = document.getElementById('textContainer');
    const words = await WordsFetcher.getWordList();
    textContainer.textContent = words;
    return words;
}

export { WordsFetcher, loadContent };
