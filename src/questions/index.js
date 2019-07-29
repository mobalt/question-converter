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

function findClosestCanvas(type) {
    const v = Object.values(types)
    const minI = fuzzyFind(type, v.map(t => t.canvas_type))
    return v[minI]
}
function findClosestSimple(type) {
    const v = Object.values(types)
    const minI = fuzzyFind(type || 'Multiple Choice', v.map(t => t.type))
    return v[minI]
}

function fromSimple(obj) {
    const type = findClosestSimple(obj.type)
    const question = new type(obj)
    return question
}

export { types, fromSimple }
