import 'chai/register-should'
import { describe } from 'mocha'
import { MultipleChoice } from '../../src/questions/multiple_choice'
import { fromSimple, toSimple } from '../../src/simple'

describe('Multiple Choice', () => {
    const simple_mc = {
        text: '<p> Multiple Choice Text </p>',
        points: 1,
        type: 'Multiple Choice',
        answers: ['~ Correct One', 'Wrong 1', 'Wrong 2'],
    }

    const question = fromSimple(simple_mc)

    it('is an instance of MultipleChoice', () => {
        question.should.be.an.instanceOf(MultipleChoice)
    })
    it('has correct prompt', () => {
        question.text.should.equal('<p> Multiple Choice Text </p>')
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(3)
    })
    it('correct answers are identified', () => {
        const [a, b, c] = question.answers

        a.isCorrect.should.be.true
    })
    it('wrong answers are identified', () => {
        const [a, b, c] = question.answers

        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it('is worth 1 point', () => {
        question.points.should.equal(1)
    })
})
