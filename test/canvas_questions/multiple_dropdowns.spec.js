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
        question.text.should.equal(
            '<p><span>Roses are [color1], violets are [color2]</span></p>',
        )
    })
    it.skip('has correct number of answer groups', () => {
        Object.values(question.answers).length.should.equal(2)
    })
    it.skip('d1 is correct', () => {
        const { d1 } = question.answers
        d1.length.should.equal(3)

        const [a, b, c] = sublist
        a.isCorrect.should.be.true
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it.skip('d2 is correct', () => {
        const { d2 } = question.answers
        d2.length.should.equal(4)

        sublist.should.have.lengthOf(2)

        const [a, b] = sublist
        a.isCorrect.should.be.true
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
        d.isCorrect.should.be.false
    })
    it('is worth 1 point', () => {
        question.points.should.equal(1)
    })
})
