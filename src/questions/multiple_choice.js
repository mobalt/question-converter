import { Question, Answer } from './generic'

export class MultipleChoice extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'multiple_choice_question'
    }

    static get type() {
        return 'Multiple Choice'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswers(obj.answers)
        return new MultipleChoice({ ...obj, answers })
    }
}