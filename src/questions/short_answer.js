import { Question, Answer } from './generic'

export class ShortAnswer extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'short_answer_question'
    }

    static get type() {
        return 'Short Answer'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswers(obj.answers)
        answers.forEach(ans => ans.setCorrect())
        return super.fromSimple({ ...obj, answers })
    }
}
