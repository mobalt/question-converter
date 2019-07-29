import 'chai/register-should'
import { describe } from 'mocha'
import { MultipleChoice } from '../../src/questions/multiple_choice'

describe('Multiple Choice', () => {
    const simple_mc = {
        text: '<p> Multiple Choice Text </p>',
        points: 1,
        type: 'Multiple Choice',
        answers: ['~ Correct One', 'Wrong 1', 'Wrong 2'],
    }

    const question = MultipleChoice.fromSimple(simple_mc)

    it('is an instance of MultipleChoice', () => {
        question.should.be.an.instanceOf(MultipleChoice)
    })
    it('has correct prompt', () => {
        question.should.have.property('text', '<p> Multiple Choice Text </p>')
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(3)
    })
    it('correct answers are identified', () => {
        const [a, b, c] = question.answers

        a.should.have.property('isCorrect', true)
    })
    it('wrong answers are identified', () => {
        const [a, b, c] = question.answers

        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it('is worth 1 point', () => {
        question.should.have.property('points', 1)
    })
})
