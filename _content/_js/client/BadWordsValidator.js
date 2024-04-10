class BadWordsValidator {
    constructor() {
        this.badWords = ['badword1', 'badword2', 'badword3']; // Lista de palabras prohibidas
    }

    containsBadWords(input) {
        const inputWords = input.toLowerCase().split(/\s+/);
        for (let word of inputWords) {
            if (this.badWords.includes(word)) {
                return true;
            }
        }
        return false;
    }
}