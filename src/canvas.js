import { isDefined, textHtml, transform } from './transformations'
import { Answer } from './questions/generic'
import { findType } from './questions'

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

function findClosestCanvasType(type) {
    return findType(type, convert_canvas)
}

export function toCanvas(question) {
    const canvasObj = canvasQuestion(question, true)
    canvasObj.question_type = convert_canvas[question.constructor.name]
    return canvasObj
}

export function fromCanvas(questionObj) {
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