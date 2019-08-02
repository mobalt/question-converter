import { Question } from './generic'

export class Text extends Question {
    constructor(a) {
        super(a)
        this.points = 0
    }

    static get canvas_type() {
        return 'text_only_question'
    }

    static get type() {
        return 'Text'
    }
}
