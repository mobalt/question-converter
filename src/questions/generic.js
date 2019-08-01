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

    static fromSimple(obj) {
        const answers = Answer.answerList(obj.answers)
        return new this({ ...obj, answers })
    }

    static fromCanvas(obj) {
        const simpleObj = canvasQuestion(obj)
        return new this(simpleObj)
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

    static parseAnswer(answer) {
        answer = answer.toString()
        const pattern = /^(~ *)?(.+)$/
        const result = pattern.exec(answer.trim())
        const text = result[2],
            isCorrect = !!result[1]

        return new Answer({ text, isCorrect })
    }

    static answerList(list, group, forceCorrect = false) {
        // answersObj[] --> Answer[]
        if (Array.isArray(list)) {
            return list.map(ans => safeAnswerItem(ans, group, forceCorrect))

            // {groupName: answersObj[]} --> Answer[]
        } else if (typeof list == 'object') {
            return [].concat(
                ...Object.entries(list).map(([group, list]) => {
                    return this.answerList(list, group, forceCorrect)
                }),
            )
        } else {
            return []
        }
    }
}


function transform(template) {
    const transformations = Object.entries(template).map(([left, right]) => {
        if (typeof right == 'string') {
            return [left, oneToOne(right)]
        } else {
            return [left, right]
        }
    })

    return function(obj, reverse = false) {
        const direction = reverse ? 'backward' : 'forward'
        const parts = transformations.map(([leftName, fnObj]) => {
            return fnObj[direction](obj, leftName)
        })
        // merge all the parts into a single Object
        return Object.assign(...parts)
    }
}

function isDefined(value) {
    return typeof value != 'undefined' && value != null
}

function oneToOne(right) {
    return {
        forward: (obj, left) => propIfValue(left, obj[right]),
        backward: (obj, left) => propIfValue(right, obj[left]),
    }

    function propIfValue(propName, value) {
        const result = {}
        if (isDefined(value)) result[propName] = value
        return result
    }
}

function textHtml(textName, htmlName) {
    if (!htmlName) htmlName = textName + '_html'

    return {
        forward(obj, leftPropName) {
            return {
                [leftPropName]:
                    obj[textName] == '' ? obj[htmlName] : obj[textName],
            }
        },
        backward(obj, leftPropName) {
            const value = obj[leftPropName]
            if (isDefined(value)) {
                return {
                    [containsHTML(value) ? htmlName : textName]: value.trim(),
                }
            } else {
                return { [textName]: '' }
            }
        },
    }

    function containsHTML(str) {
        return /<([^>]+)>/.test(str)
    }
}

const canvasAnswer = transform({
    id: 'id',
    group: 'blank_id',
    comments: textHtml('comments'),
    text: textHtml('text', 'html'),
    isCorrect: {
        forward(obj) {
            return {
                isCorrect: !!obj.weight,
            }
        },
        backward(obj) {
            return {
                weight: obj.isCorrect ? 100 : 0,
            }
        },
    },
})

const canvasQuestion = transform({
    id: 'id',
    name: 'question_name',
    points: 'points_possible',
    text: 'question_text',
    type: 'question_type',
    correct_comments: textHtml('correct_comments'),
    incorrect_comments: textHtml('incorrect_comments'),
    neutral_comments: textHtml('neutral_comments'),
    answers: {
        forward(obj) {
            return {
                answers: obj.answers.map(o => new Answer(canvasAnswer(o))),
            }
        },
        backward(obj) {
            return { answers: obj.answers.map(o => canvasAnswer(o, true)) }
        },
    },
})

function parseAnswerText(answer) {
    answer = answer ? answer.toString() : ''
    const pattern = /^(~ *)?(.+)$/
    const result = pattern.exec(answer.trim())
    const text = result[2],
        isCorrect = !!result[1]

    return { text, isCorrect }
}

function safeAnswerItem(item, group, forceCorrect = false) {
    const result =
        typeof item == 'object'
            ? { group, ...item, ...parseAnswerText(item.text) }
            : { group, ...parseAnswerText(item) }

    if (forceCorrect || item.isCorrect) result.isCorrect = true
    return new Answer(result)
}
