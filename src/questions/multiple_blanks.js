import { Question, Answer } from './generic'

export class FillInMultipleBlanks extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'fill_in_multiple_blanks_question'
    }

    static get type() {
        return 'Multiple Blanks'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswerGroups(obj.answers)
        return super.fromSimple({ ...obj, answers })
    }
}
