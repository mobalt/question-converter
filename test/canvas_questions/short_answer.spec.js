import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { ShortAnswer as QuestionType } from '../../src/questions/short_answer'

describe('Short Answer', () => {
    const canvas_question_obj = canvas_questions[2]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is correct instance', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.should.have.property('text', '<p>Roses are _____. </p>')
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(2)
    })
    it('correct answers are identified', () => {
        question.answers.forEach(ans => {
            ans.isCorrect.should.be.true
        })
    })
    it('wrong answers are identified', () => {
        question.answers.forEach(ans => {
            ans.isCorrect.should.not.be.false
        })
    })
    it('is worth 1 points', () => {
        question.should.have.property('points', 1)
    })
})
