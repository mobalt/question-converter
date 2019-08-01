import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { Text as QuestionType } from '../../src/questions/text'
import qs from '../../src/questions'

describe('Text', () => {
    const canvas_question_obj = canvas_questions[9]
    const question = qs.fromCanvas(canvas_question_obj)

    it('is an instance of Text', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct question label', function() {
        question.text.should.equal('<p>This has no question.</p>')
    })
    it('has no answer items', function() {
        question.answers.should.be.empty
    })
    it('worth correct number of points', function() {
        question.points.should.equal(0)
    })
})
