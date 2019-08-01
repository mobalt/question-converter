import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { TrueFalse as QuestionType } from '../../src/questions/truefalse'
import qs from '../../src/questions'

describe('True/False', () => {
    const canvas_question_obj = canvas_questions[1]
    const question = qs.fromCanvas(canvas_question_obj)

    it('is an instance of correct class', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct question label', function() {
        question.text.should.equal('<p>Is this true?</p>')
    })
    it('has correct number of answers', function() {
        question.answers.should.have.lengthOf(2)
    })
    it('has only one answer labelled correct', function() {
        const [t, f] = question.answers

        t.isCorrect.should.be.true
        f.isCorrect.should.be.false
    })
    it('worth correct number of points', function() {
        question.points.should.equal(2)
    })
})
