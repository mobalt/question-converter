import editDistance from 'js-levenshtein'
//import { Answer, Question } from './generic'
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
const fromCanvas = Question.fromCanvas

function getType(type) {
    let min = Number.MAX_SAFE_INTEGER,
        minType = MultipleChoice

    for (let name in types) {
        const result = editDistance(type, name)
        if (result < min) {
            min = result
            minType = types[name]
        }
    }
    return minType
}

function fromSimple(obj) {
    const type = getType(obj.type)
    let answers

    //console.log('type>>>>',type.name)
    switch (type) {
        case MultipleChoice:
        case MultipleAnswers:
        case ShortAnswer:
            answers = Answer.mapAnswers(obj.answers)
            break
        case FillInMultipleBlanks:
        case MultipleDropdowns:
            answers = Answer.mapAnswerGroups(obj.answers)
            break
    }

    const result = new type({ ...obj, answers })
    return result
}

export { toCanvas, toSimpleObjects, types, fromCanvas, fromSimple }
