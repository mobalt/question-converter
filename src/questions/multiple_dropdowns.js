import { Question } from './generic'

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
}
