import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { Essay as QuestionType } from '../../src/questions/essay'

describe.skip('Essay', () => {
    const canvas_question_obj = canvas_questions[7]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is correct instance', function() {
        question.should.be.an.instanceOf(QuestionType)
    })

    it.skip('has correct question label', function() {
        question.should.have.property('text', 'Write a 500-word essay below:')
    })

    it.skip('has no answer items', function() {
        should.not.exist(question.answers)
    })

    it.skip('worth correct number of points', function() {
        question.should.have.property('points', 1)
    })
})
