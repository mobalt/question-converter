export class Question {
    constructor({
        text,
        name = 'Question',
        points = 1,
        answers,
        correct_comments,
        incorrect_comments,
        neutral_comments,
    }) {
        this.text = text ? text.trim() : ''
        this.name = name
        this.points = points
        this.answers = answers
        this.correct_comments = correct_comments
        this.incorrect_comments = incorrect_comments
        this.neutral_comments = neutral_comments
        this.forceCorrect = false
    }

    get answerObj() {
        const obj = {}
        for (let ans of this.answers) {
            if (obj[ans.group]) {
                obj[ans.group].push(ans)
            } else {
                obj[ans.group] = [ans]
            }
        }
        return obj
    }

    toCanvas() {
        return canvasQuestion(this, true)
    }

    static get canvas_type() {
        throw new Error("Don't use the internal Question class")
        return 'generic_question'
    }

    static get type() {
        throw new Error("Don't use the internal Question class")
        return 'Generic Question'
    }

}

export class Answer {
    constructor({ text, isCorrect = false, group, comments, id }) {
        this.text = text
        this.isCorrect = isCorrect
        this.group = group
        this.comments = comments
        this.id = id
    }
}


