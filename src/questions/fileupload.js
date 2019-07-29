import { Question, Answer } from './generic'

export class FileUpload extends Question {
    constructor(a) {
        super(a)
    }

    static get canvas_type() {
        return 'file_upload_question'
    }

    static get type() {
        return 'FileUpload'
    }

    static fromSimple(obj) {
        return new FileUpload({ ...obj})
    }
}
