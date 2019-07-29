import { Question, Answer } from './generic'

export class TrueFalse extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'essay_question'
    }

    static get type() {
        return 'True False'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswerGroups(obj.answers)
        return new TrueFalse({ ...obj, answers })
    }
}
