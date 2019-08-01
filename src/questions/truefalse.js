import { Question, Answer } from './generic'

export class TrueFalse extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'true_false_question'
    }

    static get type() {
        return 'True False'
    }

    static fromSimple(obj) {
        //todo: make sure answer/answers doesn't cause problems
        const answers = [
            { text: 'True', isCorrect: obj.answer },
            { text: 'False', isCorrect: !obj.answer },
        ]
        return super.fromSimple({ ...obj, answers })
    }
}
