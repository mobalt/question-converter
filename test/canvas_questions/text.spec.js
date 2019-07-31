import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { Text as QuestionType } from '../../src/questions/text'

describe.skip('Text', () => {
    const canvas_question_obj = canvas_questions[9]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is an instance of Text', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it.skip('has correct question label', function() {
        question.should.have.property('text', 'Just text.')
    })
    it.skip('has no answer items', function() {
        should.not.exist(question.answers)
    })
    it.skip('worth correct number of points', function() {
        question.should.have.property('points', 0)
    })
})
