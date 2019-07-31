import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { ShortAnswer as QuestionType } from '../../src/questions/short_answer'

describe.skip('Short Answer', () => {
    const canvas_question_obj = canvas_questions[2]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is correct instance', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it.skip('has correct prompt', () => {
        question.should.have.property(
            'text',
            'What is one of the first two numbers?',
        )
    })
    it.skip('has correct number of answers', () => {
        question.answers.length.should.equal(4)
    })
    it.skip('correct answers are identified', () => {
        question.answers.forEach(ans => {
            ans.isCorrect.should.be.true
        })
    })
    it.skip('wrong answers are identified', () => {
        question.answers.forEach(ans => {
            ans.isCorrect.should.not.be.false
        })
    })
    it.skip('is worth 1 points', () => {
        question.should.have.property('points', 1)
    })
})
