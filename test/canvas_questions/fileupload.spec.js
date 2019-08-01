import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FileUpload as QuestionType } from '../../src/questions/fileupload'
import qs from '../../src/questions'

describe('FileUpload', () => {
    const canvas_obj = {
        id: 9,
        question_name: 'File Upload',
        points_possible: 1,
        question_text: '<p>Upload your <strong>docx</strong> file.</p>',
        answers: [],
        question_type: 'file_upload_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of FileUpload', () => {
            question.should.be.an.instanceOf(qs.types.FileUpload)
        })

        it('has correct question label', function() {
            question.text.should.equal(
                '<p>Upload your <strong>docx</strong> file.</p>',
            )
        })

        it('has no answer items', function() {
            question.answers.should.be.an('array').but.empty
        })

        it('worth correct number of points', function() {
            question.points.should.equal(1)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[8]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
