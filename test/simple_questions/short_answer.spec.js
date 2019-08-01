import 'chai/register-should'
import { describe } from 'mocha'
import { ShortAnswer } from '../../src/questions/short_answer'
import { QfromCanvas, QfromSimple } from '../../src/questions'

describe('Short Answer', () => {
    const simple_shortanswer = {
        text: 'What is one of the first two numbers?',
        type: 'ShortAnswer',
        answers: [1, 'One', '~ 2', '~    Two'],
    }
    const question = QfromSimple(simple_shortanswer)

    it('is correct instance', () => {
        question.should.be.an.instanceOf(ShortAnswer)
    })
    it('has correct prompt', () => {
        question.text.should.equal('What is one of the first two numbers?')
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(4)
    })
    it('all answers are labelled correct', () => {
        question.answers.should.have.lengthOf(4)
        const [a, b, c, d] = question.answers

        a.isCorrect.should.be.true
        b.isCorrect.should.be.true
        c.isCorrect.should.be.true
        d.isCorrect.should.be.true
    })
    it('is worth 1 points', () => {
        question.points.should.equal(1)
    })
})
