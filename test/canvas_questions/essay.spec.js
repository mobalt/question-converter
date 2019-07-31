import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { Essay as QuestionType } from '../../src/questions/essay'

describe('Essay', () => {
    const canvas_question_obj = canvas_questions[7]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is correct instance', function() {
        question.should.be.an.instanceOf(QuestionType)
    })

    it('has correct question label', function() {
        question.text.should.equal('<p>Type an essay.</p>')
    })

    it('has no answer items', function() {
        question.answers.should.be.empty
    })

    it('worth correct number of points', function() {
        question.points.should.equal(1)
    })
})
