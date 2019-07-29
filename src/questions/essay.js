import { Question, Answer } from './generic'

export class Essay extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'essay_question'
    }

    static get type() {
        return 'Essay'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswerGroups(obj.answers)
        return new Essay({ ...obj, answers })
    }
}
