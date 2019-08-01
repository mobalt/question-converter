import 'chai/register-should'
import { describe } from 'mocha'
import { MultipleAnswers } from '../../src/questions/multiple_answers'
import { QfromCanvas, QfromSimple } from '../../src/questions'

describe('Multiple Answers', () => {
    const simple_multianswers = {
        text: '<p> Two or more? <i>(select all that apply)</i></p>',
        points: 2,
        type: 'Multiple Answers',
        answers: ['Wrong 1', '~ Right 1', 'Wrong 2', '~Right 2', 'Wrong 3'],
    }
    const question = QfromSimple(simple_multianswers)

    it('is an instance of MultipleAnswers', () => {
        question.should.be.an.instanceOf(MultipleAnswers)
    })
    it('has correct prompt', () => {
        question.text.should.equal(
            '<p> Two or more? <i>(select all that apply)</i></p>',
        )
    })
    it('has correct number of answers', () => {
        question.answers.should.have.lengthOf(5)
    })
    it('correct answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        b.isCorrect.should.be.true
        d.isCorrect.should.be.true
    })
    it('wrong answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        a.isCorrect.should.be.false
        c.isCorrect.should.be.false
        e.isCorrect.should.be.false
    })
    it('is worth 2 points', () => {
        question.points.should.equal(2)
    })
})
