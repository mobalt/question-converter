import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FileUpload as QuestionType } from '../../src/questions/fileupload'
import qs from '../../src/questions'

describe('FileUpload', () => {
    const canvas_question_obj = canvas_questions[8]
    const question = qs.fromCanvas(canvas_question_obj)

    it('is an instance of FileUpload', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct question label', function() {
        question.text.should.equal(
            '<p>Upload your <strong>docx</strong> file.</p>',
        )
    })
    it('has no answer items', function() {
        question.answers.should.be.empty
    })
    it('worth correct number of points', function() {
        question.points.should.equal(1)
    })
})
