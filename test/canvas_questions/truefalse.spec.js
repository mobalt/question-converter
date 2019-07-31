import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { TrueFalse as QuestionType } from '../../src/questions/truefalse'

describe('True/False', () => {
    const canvas_question_obj = canvas_questions[1]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of correct class', function() {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct question label', function() {
        question.should.have.property('text', '<p>Is this true?</p>')
    })
    it('has correct number of answers', function() {
        question.answers.length.should.equal(2)
    })
    it('correct answers are labelled as such', function() {
        const [t, f] = question.answers

        t.isCorrect.should.be.true
    })
    it('wrong answers work', function() {
        const [t, f] = question.answers

        f.isCorrect.should.be.false
    })
    it('worth correct number of points', function() {
        question.should.have.property('points', 2)
    })
})
