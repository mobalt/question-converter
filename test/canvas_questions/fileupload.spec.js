import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FileUpload as QuestionType } from '../../src/questions/fileupload'

describe('FileUpload', () => {
    const canvas_question_obj = canvas_questions[8]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of FileUpload', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct question label', function() {
        question.should.have.property(
            'text',
            '<p>Upload your <strong>docx</strong> file.</p>',
        )
    })
    it('has correct number of answers', function() {
        question.answers.should.be.empty
    })
    it('worth correct number of points', function() {
        question.should.have.property('points', 1)
    })
})
