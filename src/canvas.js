import Q from 'q'
import { findType } from './questions'

const lookup = {
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

function isDefined(value) {
    return typeof value != 'undefined' && value != null
}

function containsHTML(str) {
    return /<([^>]+)>/.test(str)
}

function textHtml(textName, htmlName, required = false) {
    if (!htmlName) htmlName = textName + '_html'

    return Q(
        obj => {
            const html = obj[htmlName],
                text = obj[textName]

            return (
                (html && html.trim()) ||
                (text && text.trim()) ||
                (required ? '' : undefined)
            )
        },
        value => {
            const valueText = String(value).trim()
            const result = {}

            if (isDefined(value) && valueText != '') {
                if (containsHTML(valueText)) {
                    result[htmlName] = valueText
                } else {
                    result[textName] = valueText
                }
            } else if (required) {
                result[textName] = ''
            }

            return result
        },
    )
}

const canvasQuestion = Q({
    id: 'id',
    name: 'question_name',
    points: 'points_possible',
    text: 'question_text',
    type: 'question_type',
    correct_comments: textHtml('correct_comments'),
    incorrect_comments: textHtml('incorrect_comments'),
    neutral_comments: textHtml('neutral_comments'),
    answers: Q.mapTo(
        'answers',
        Q({
            id: 'id',
            group: 'blank_id',
            comments: textHtml('comments'),
            text: textHtml('text', 'html', true),
            isCorrect: Q(
                'weight',
                weight => !!weight,
                isCorrect => (isCorrect ? 100 : 0),
            ),
        }),
    ),
})

export function toCanvas(question) {
    const canvasObj = canvasQuestion.reverse(question)
    canvasObj.question_type = lookup[question.constructor.name]
    return canvasObj
}

export function fromCanvas(questionObj) {
    const unifiedObj = canvasQuestion(questionObj)
    if (!isDefined(unifiedObj.type))
        throw new Error('Canvas object is missing type.')
    const QuestionType = findType(unifiedObj.type, lookup)
    return new QuestionType(unifiedObj)
}
