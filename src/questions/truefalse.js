import { Question, Answer } from './generic'

export class TrueFalse extends Question {
    constructor(a) {
        super(a)
        if (!this.answers || !this.answers.length) {
            this.answers = [
                new Answer({ text: 'True', isCorrect: !!a.answer }),
                new Answer({ text: 'False', isCorrect: !a.answer }),
            ]
        }
    }

    static get canvas_type() {
        return 'true_false_question'
    }

    static get type() {
        return 'True False'
    }
}
