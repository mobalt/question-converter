import { Question } from './generic'

export class FillInMultipleBlanks extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'fill_in_multiple_blanks_question'
    }

    static get type() {
        return 'Multiple Blanks'
    }
}
