import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleDropdowns as QuestionType } from '../../src/questions/multiple_dropdowns'

describe('Multiple Dropdowns', () => {
    const canvas_question_obj = canvas_questions[5]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleDropdowns', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p><span>Roses are [color1], violets are [color2]</span></p>',
        )
    })
    it.skip('has correct number of answer groups', () => {
        Object.values(question.answers).length.should.equal(2)
    })
    it.skip('d1 is correct', () => {
        const { d1 } = question.answers
        d1.length.should.equal(3)

        const [a, b, c] = d1
        a.should.have.property('isCorrect', true)
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it.skip('d2 is correct', () => {
        const { d2 } = question.answers
        d2.length.should.equal(4)

        const [a, b, c, d] = d2
        a.should.have.property('isCorrect', true)
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
        d.isCorrect.should.be.false
    })
    it('is worth 1 point', () => {
        question.should.have.property('points', 1)
    })
})
