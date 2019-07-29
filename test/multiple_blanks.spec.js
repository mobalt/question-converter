import 'chai/register-should'
import { describe } from 'mocha'
import { FillInMultipleBlanks } from '../src/questions/multiple_blanks'

describe('Fill In Multiple Blanks', () => {
    const simple_multiblanks = {
        text: '<p>Roses are [color1], violets are [color2]</p>\n',
        type: 'Fill In Multiple Blanks',
        answers: {
            color1: ['red', 'pink', 'white'],
            color2: ['blue', 'violet'],
        },
    }
    const question = FillInMultipleBlanks.fromSimple(simple_multiblanks)

    it('is an instance of MultipleBlanks', () => {
        question.should.be.an.instanceOf(FillInMultipleBlanks)
    })
    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p>Roses are [color1], violets are [color2]</p>',
        )
    })
    it('has correct number of answer groups', () => {
        Object.keys(question.answers).length.should.equal(2)
    })
    it('color1 has 3 answers', () => {
        question.answers.should.have.property('color1')
        question.answers.color1.length.should.equal(3)
    })
    it('color2 has 2 answers', () => {
        question.answers.should.have.property('color2')
        question.answers.color2.length.should.equal(2)
    })
    it('is worth 1 points', () => {
        question.should.have.property('points', 1)
    })
})
