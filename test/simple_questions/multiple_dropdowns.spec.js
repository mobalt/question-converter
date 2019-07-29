import 'chai/register-should'
import { describe } from 'mocha'
import { MultipleDropdowns } from '../../src/questions/multiple_dropdowns'

describe('Multiple Dropdowns', () => {
    const simple_mdropdowns = {
        text: 'Roses = [d1], Violets = [d2]',
        type: 'Multiple Dropdowns',
        answers: {
            d2: ['~blue', 'ugly', 42, 'wrong'],
            d1: ['~ red', 'green', 'blue'],
        },
    }

    const question = MultipleDropdowns.fromSimple(simple_mdropdowns)

    it('is an instance of MultipleDropdowns', () => {
        question.should.be.an.instanceOf(MultipleDropdowns)
    })
    it('has correct prompt', () => {
        question.should.have.property('text', 'Roses = [d1], Violets = [d2]')
    })
    it('has correct number of answer groups', () => {
        Object.values(question.answers).length.should.equal(2)
    })
    it('d1 is correct', () => {
        const { d1 } = question.answers
        d1.length.should.equal(3)

        const [a, b, c] = d1
        a.should.have.property('isCorrect', true)
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it('d2 is correct', () => {
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
