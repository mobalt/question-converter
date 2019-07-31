import { Question, Answer } from './generic'

export class MultipleDropdowns extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'multiple_dropdowns_question'
    }

    static get type() {
        return 'Multiple Dropdowns'
    }

    static fromSimple(obj) {
        // const answers = Answer.mapAnswerGroups(obj.answers)
        const answers = Answer.answerList(obj.answers)
        return super.fromSimple({ ...obj, answers })
    }
}
