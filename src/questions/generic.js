export class Answer {
    constructor(text, isCorrect = false) {
        this.text = text
        this.isCorrect = isCorrect
    }

    setCorrect() {
        this.isCorrect = true
    }

    static parseAnswer(answer) {
        answer = answer.toString()
        const pattern = /^(~ *)?(.+)$/
        const result = pattern.exec(answer.trim())
        const text = result[2],
            isCorrect = !!result[1]

        return new Answer(text, isCorrect)
    }

    static mapAnswers(a) {
        return a.map(ans => {
            if (typeof ans === 'object') {
                //todo: extract other properties
                return this.parseAnswer(ans.text)
            } else {
                // must be 'string'
                return this.parseAnswer(ans)
            }
        })
    }
    static mapAnswerGroups(obj) {
        const answers = {}
        for (let answerGroup in obj) {
            answers[answerGroup] = this.mapAnswers(obj[answerGroup])
        }
        return answers
    }
}
