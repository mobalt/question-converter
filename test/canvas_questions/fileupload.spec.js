import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FileUpload as QuestionType } from '../../src/questions/fileupload'

describe.skip('FileUpload', () => {
    const canvas_question_obj = canvas_questions[8]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is an instance of FileUpload', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it.skip('has correct question label', function() {
        question.should.have.property(
            'text',
            '<p>Upload your presentation in <b>*.pptx</b> format.</p>',
        )
    })
    it.skip('has correct number of answers', function() {
        should.not.exist(question.answers)
    })
    it.skip('worth correct number of points', function() {
        question.should.have.property('points', 1)
    })
})
