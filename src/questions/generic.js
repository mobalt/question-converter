export class Question {
    constructor({
        text,
        name = 'Question',
        points = 1,
        answers,
        correct_comments,
        incorrect_comments,
        neutral_comments,
        id,
    }) {
        this.id = id
        this.text = text ? text.trim() : ''
        this.name = name
        this.points = points
        if (Array.isArray(answers)) {
            this.answers = answers.map(ansObj => new Answer(ansObj))
        } else this.answers = []
        this.correct_comments = correct_comments
        this.incorrect_comments = incorrect_comments
        this.neutral_comments = neutral_comments
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

    static get forceCorrect() {
        return false
    }
    addAnswer(obj) {
        this.answers.push(new Answer(obj))
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
