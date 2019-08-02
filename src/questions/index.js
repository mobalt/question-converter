import editDistance from 'js-levenshtein'
import { Answer, Question } from './generic'
import { Essay } from './essay'
import { FileUpload } from './fileupload'
import { FillInMultipleBlanks } from './multiple_blanks'
import { MultipleAnswers } from './multiple_answers'
import { MultipleChoice } from './multiple_choice'
import { MultipleDropdowns } from './multiple_dropdowns'
import { ShortAnswer } from './short_answer'
import { Text } from './text'
import { TrueFalse } from './truefalse'
import { fromSimple, toSimple } from '../simple'
import { isDefined, textHtml, transform } from '../transformations'

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
const exact_lookup = {}

for (let name in types) {
    exact_lookup[name] = name
}
const convert_canvas = {
    Essay: 'essay_question',
    FileUpload: 'file_upload_question',
    MultipleAnswers: 'multiple_answers_question',
    FillInMultipleBlanks: 'fill_in_multiple_blanks_question',
    MultipleChoice: 'multiple_choice_question',
    MultipleDropdowns: 'multiple_dropdowns_question',
    ShortAnswer: 'short_answer_question',
    Text: 'text_only_question',
    TrueFalse: 'true_false_question',
}

export function findType(fuzzyName, lookupDict = exact_lookup) {
    let minDistance = Number.MAX_SAFE_INTEGER,
        closestType

    for (let typename in lookupDict) {
        const distance = editDistance(fuzzyName, lookupDict[typename])
        if (distance < minDistance) {
            minDistance = distance
            closestType = typename
        }
    }

    return types[closestType]
}

function findClosestCanvasType(type) {
    return findType(type, convert_canvas)
}

function toCanvas(question) {
    const canvasObj = canvasQuestion(question, true)
    canvasObj.question_type = convert_canvas[question.constructor.name]
    return canvasObj
}

function fromCanvas(questionObj) {
    const unifiedObj = canvasQuestion(questionObj)
    if (!isDefined(unifiedObj.type))
        throw new Error('Canvas object is missing type.')
    const QuestionType = findClosestCanvasType(unifiedObj.type)
    return new QuestionType(unifiedObj)
}

const canvasAnswer = transform({
    id: 'id',
    group: 'blank_id',
    comments: textHtml('comments'),
    text: textHtml('text', 'html', true),
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

export default {
    fromSimple,
    fromCanvas,
    toCanvas,
    toSimple,
    types: {
        ...types,
        Answer,
        Question,
    },
}
