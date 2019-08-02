import { Question } from './generic'

export class ShortAnswer extends Question {
    constructor(a) {
        super(a)
    }

    static get forceCorrect() {
        return true
    }
}
