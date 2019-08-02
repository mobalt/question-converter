import { Answer } from './questions/generic'
import { findType } from './questions'

const convert_simple = {
    Essay: 'Essay',
    FileUpload: 'FileUpload',
    MultipleAnswers: 'Multiple Answers',
    FillInMultipleBlanks: 'Multiple Blanks',
    MultipleChoice: 'Multiple Choice',
    MultipleDropdowns: 'Multiple Dropdowns',
    ShortAnswer: 'Short Answer',
    Text: 'Text',
    TrueFalse: 'True False',
}

function findClosestSimpleType(type) {
    if (!type) type = 'Multiple Choice'
    return findType(type, convert_simple)
}

export function toSimple(question) {
    return {
        ...question,
        answers: question.answerObj,
    }
}

export function fromSimple(simpleObj) {
    const QuestionType = findClosestSimpleType(simpleObj.type)
    const unifiedObj = {
        ...simpleObj,
        answers: answerList(simpleObj.answers, QuestionType.forceCorrect),
    }
    return new QuestionType(unifiedObj)
}

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
