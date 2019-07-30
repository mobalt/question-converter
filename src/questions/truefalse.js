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
        //todo: make sure answer/answers doesn't cause problems
        const answers = [
            new Answer({ text: 'true', isCorrect: obj.answer }),
            new Answer({ text: 'false', isCorrect: !obj.answer }),
        ]
        return new TrueFalse({ ...obj, answers })
    }
}
