import { findType } from './questions'

/**
 *  Creates an object that can be safely passed into new Answer(obj)
 * @param {string|number|Object} item
 * @param group
 * @param forceCorrect
 * @returns {{text: string, isCorrect: boolean, ...}}
 */
function safeAnswerItem(item, group, forceCorrect = false) {
    let ansObj, text

    if (typeof item == 'object') {
        text = item.text
        ansObj = { group, ...item }
    } else {
        text = item
        ansObj = { group }
    }

    // string coercion
    text = String(text).trim()

    const rxMatch = /^(~ *)?(.+)$/.exec(text)

    ansObj.text = rxMatch[2]
    ansObj.isCorrect = !!rxMatch[1] || forceCorrect || !!ansObj.isCorrect

    return ansObj
}

function safeAnswerList(answers, forceCorrect, groupName) {
    if (!answers) return []

    // if already a list,
    //    then just process each item
    if (Array.isArray(answers))
        return answers.map(ans => safeAnswerItem(ans, groupName, forceCorrect))

    // else if is a dict of lists,
    //   then process the sublists
    if (typeof answers == 'object')
        return Object.entries(answers)
            .map(([groupName, sublist]) =>
                safeAnswerList(sublist, forceCorrect, groupName),
            )
            .flat()

    // else, must be a string
    //     process as a single item
    return [safeAnswerItem(answers, groupName, forceCorrect)]
}

const lookup = {
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

export function toSimple(question) {
    const result = { ...question }
    result.type = lookup[question.constructor.name]

    // if answers contains only a single group, then promote it
    const answers = question.answerObj
	const groups = Object.keys(answers)
	result.answers = groups.length == 1 ? answers[groups[0]] : answers

    return result
}

export function fromSimple(obj) {
    // MC is the default type, if type == undefined
    const { type = lookup.MultipleChoice } = obj
    const QuestionType = findType(type, lookup)

    obj.answers = safeAnswerList(obj.answers, QuestionType.forceCorrect)

    return new QuestionType(obj)
}
