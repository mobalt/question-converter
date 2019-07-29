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
        const answers = [
            new Answer('true', obj.answer),
            new Answer('false', !obj.answer),
        ]
        return new TrueFalse({ ...obj, answers })
    }
}
