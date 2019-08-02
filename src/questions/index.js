import editDistance from 'js-levenshtein'
import {Answer, Question} from './generic'
import {Essay} from './essay'
import {FileUpload} from './fileupload'
import {FillInMultipleBlanks} from './multiple_blanks'
import {MultipleAnswers} from './multiple_answers'
import {MultipleChoice} from './multiple_choice'
import {MultipleDropdowns} from './multiple_dropdowns'
import {ShortAnswer} from './short_answer'
import {Text} from './text'
import {TrueFalse} from './truefalse'
import {fromSimple, toSimple} from '../simple'
import {fromCanvas, toCanvas} from "../canvas"

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
