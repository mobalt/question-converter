import { Question, Answer } from './generic'

export class FileUpload extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'essay_question'
    }

    static get type() {
        return 'FileUpload'
    }

    static fromSimple(obj) {
        const answers = Answer.mapAnswerGroups(obj.answers)
        return new FileUpload({ ...obj, answers })
    }
}
