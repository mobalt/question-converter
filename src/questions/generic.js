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

function get_first_nonempty_field(obj, fields) {
    for (let i of fields) {
        if (obj[i] !== '') {
            return obj[i]
        }
    }
    return null
}

function convert(template) {
    return function(obj) {
        const newObj = {}
        for (let propName in template) {
            const prop = template[propName]

            let result = null
            if (Array.isArray(prop)) {
                result = get_first_nonempty_field(obj, prop)
            } else if (typeof prop == 'string') {
                result = obj[prop] !== '' ? obj[prop] : null
            } else if (typeof prop == 'function') {
                result = prop(obj)
            } else {
                throw new Error('Unexpected format')
            }

            newObj[propName] = result
        }
        return newObj
    }
}
const canvasAnswer = convert({
    text: ['text', 'html'],
    comments: ['comments', 'comments_html'],
    group: ['blank_id'],
    id: ['id'],
    isCorrect: obj => !!obj.weight,
})
const canvasQuestion = convert({
    id: ['id'],
    name: ['question_name'],
    points: ['points_possible'],
    text: ['question_text'],
    correct_comments: ['correct_comments', 'correct_comments_html'],
    incorrect_comments: ['incorrect_comments', 'incorrect_comments_html'],
    neutral_comments: ['neutral_comments', 'neutral_comments_html'],
    answers: obj => obj.answers.map(canvasAnswer),
})
