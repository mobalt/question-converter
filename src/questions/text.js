import { Question, Answer } from './generic'

export class Text extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'text_question'
    }

    static get type() {
        return 'Text'
    }

    static fromSimple(obj) {
        return new Text({ ...obj, points: 0 })
    }
}
