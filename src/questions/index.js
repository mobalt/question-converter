import editDistance from 'js-levenshtein'
import { Question, Answer } from './questions/generic'
import { MultipleChoice } from './questions/multiple_choice'
import { MultipleAnswers } from './questions/multiple_answers'
import { ShortAnswer } from './questions/short_answer'
import { MultipleDropdowns } from './questions/multiple_dropdowns'
import { FillInMultipleBlanks } from './questions/multiple_blanks'
import { Essay } from './questions/essay'
import { FileUpload } from './questions/fileupload'
import { TrueFalse } from './questions/truefalse'
import { Text as TextOnly } from './questions/text'

function toSnakeCase(camelCase) {
    return camelCase
        .replace(/[A-Z]/g, m => '_' + m)
        .substr(1)
        .toLowerCase()
}

function toCanvas(obj) {}

function toSimpleObjects(obj) {
    return new MultipleChoice('Test')
}

const types = {
    MultipleAnswers,
    MultipleChoice,
    Answer,
    Essay,
    TextOnly,
    ShortAnswer,
    FileUpload,
    FillInMultipleBlanks,
    MultipleDropdowns,
    TrueFalse,
    Item: Question,
}

const t = {
    true_false_question: TrueFalse,
    text_only_question: TextOnly,
    essay_question: Essay,
    multiple_dropdowns_question: MultipleDropdowns,
    multiple_choice_question: MultipleChoice,
    multiple_answers_question: MultipleAnswers,
    short_answer_question: ShortAnswer,
    fill_in_multiple_blanks_question: FillInMultipleBlanks,
    file_upload_question: FileUpload,
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
