import { Question, Answer } from './generic'

export class ShortAnswer extends Question {
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
        answers.forEach(ans => ans.setCorrect())
        return new ShortAnswer({ ...obj, answers })
    }
}
