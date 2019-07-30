import { Question, Answer } from './generic'

export class MultipleAnswers extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'multiple_answers_question'
    }

    static get type() {
        return 'Multiple Answers'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswers(obj.answers)
        return super.fromSimple({ ...obj, answers })
    }
}
