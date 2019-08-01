import editDistance from 'js-levenshtein'
import { Answer } from './generic'
import { Essay } from './essay'
import { FileUpload } from './fileupload'
import { FillInMultipleBlanks } from './multiple_blanks'
import { MultipleAnswers } from './multiple_answers'
import { MultipleChoice } from './multiple_choice'
import { MultipleDropdowns } from './multiple_dropdowns'
import { ShortAnswer } from './short_answer'
import { Text } from './text'
import { TrueFalse } from './truefalse'

const types = {
    Essay,
    FileUpload,
    FillInMultipleBlanks,
    MultipleAnswers,
    MultipleChoice,
    MultipleDropdowns,
    ShortAnswer,
    Text,
    TrueFalse,
}

function fuzzyFind(needle, haystack) {
    let minDistance = Number.MAX_SAFE_INTEGER,
        minI = -1

    for (let i in haystack) {
        const distance = editDistance(needle, haystack[i])
        if (distance < minDistance) {
            minDistance = distance
            minI = i
        }
    }

    return minI
}

function findClosestCanvasType(type) {
    const v = Object.values(types)
    const minI = fuzzyFind(type, v.map(t => t.canvas_type))
    return v[minI]
}
function findClosestSimpleType(type) {
    const v = Object.values(types)
    const minI = fuzzyFind(type || 'Multiple Choice', v.map(t => t.type))
    return v[minI]
}

function QfromSimple(simpleObj) {
    const QuestionType = findClosestSimpleType(simpleObj.type)
    const unifiedObj = {
        ...simpleObj,
        answers: answerList(simpleObj.answers, QuestionType.forceCorrect),
    }
    return new QuestionType(unifiedObj)
}

function QfromCanvas(questionObj) {
    const unifiedObj = canvasQuestion(questionObj)
    if (!isDefined(unifiedObj.type))
        throw new Error('Canvas object is missing type.')
    const QuestionType = findClosestCanvasType(unifiedObj.type)
    return new QuestionType(unifiedObj)
}

function answerList(list, forceCorrect, group) {
    // answersObj[] --> Answer[]
    if (Array.isArray(list)) {
        return list.map(ans => safeAnswerItem(ans, group, forceCorrect))

        // {groupName: answersObj[]} --> Answer[]
    } else if (typeof list == 'object') {
        return [].concat(
            ...Object.entries(list).map(([group, list]) => {
                return answerList(list, forceCorrect, group)
            }),
        )
    } else {
        return []
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

export default {
    fromSimple: QfromSimple,
    fromCanvas: QfromCanvas,
    toCanvas(question) {
        return canvasQuestion(question, true)
    },
    toSimple(question) {
        return {
            ...question,
            answers: question.answerObj,
        }
    },
    types,
}
