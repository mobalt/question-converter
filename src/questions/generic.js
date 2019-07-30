export class Question {
    constructor({ text, name = 'Question', points = 1, answers }) {
        this.text = text ? text.trim() : ''
        this.name = name
        this.points = points
        this.answers = answers
    }

    get type() {
        return toSnakeCase(this.constructor.name) + '_question'
    }

    static get canvas_type() {
        throw new Error("Don't use the internal Question class")
        return 'generic_question'
    }

    static get type() {
        throw new Error("Don't use the internal Question class")
        return 'Generic Question'
    }

    static fromSimple(obj) {
        return null
    }

    static fromCanvas(obj) {
        if (obj.question_type in t) {
            console.log('returning ', obj.question_type, t[obj.question_type])
            return new t[obj.question_type](obj.question_text)
        } else {
            //return new MultipleChoice('Test')
        }
    }

    addAnswer(text = '', isCorrect = false) {}
}

export class Answer {
    constructor({ text, isCorrect = false, group, comments, id }) {
        this.text = text
        this.isCorrect = isCorrect
        this.group = group
        this.comments = comments
        this.id = id
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

        return new Answer({ text, isCorrect })
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
