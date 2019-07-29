import 'chai/register-should'
import { describe } from 'mocha'
import { ShortAnswer } from '../../src/questions/short_answer'

describe('Short Answer', () => {
    const simple_shortanswer = {
        text: 'What is one of the first two numbers?',
        type: 'ShortAnswer',
        answers: [1, 'One', '~ 2', '~    Two'],
    }
    const question = ShortAnswer.fromSimple(simple_shortanswer)

    it('is correct instance', () => {
        question.should.be.an.instanceOf(ShortAnswer)
    })
    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            'What is one of the first two numbers?',
        )
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(4)
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
