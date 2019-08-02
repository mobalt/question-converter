import { Question } from './generic'

export class ShortAnswer extends Question {
    constructor(a) {
        super(a)
    }

    static get forceCorrect() {
        return true
    }

    static get canvas_type() {
        return 'short_answer_question'
    }

    static get type() {
        return 'Short Answer'
    }
}
