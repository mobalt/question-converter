import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FillInMultipleBlanks as QuestionType } from '../../src/questions/multiple_blanks'

describe.skip('Fill In Multiple Blanks', () => {
    const canvas_question_obj = canvas_questions[3]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is an instance of MultipleBlanks', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it.skip('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p>Roses are [color1], violets are [color2]</p>',
        )
    })
    it.skip('has correct number of answer groups', () => {
        Object.keys(question.answers).length.should.equal(2)
    })
    it.skip('color1 has 3 answers', () => {
        question.answers.should.have.property('color1')
        question.answers.color1.length.should.equal(3)
    })
    it.skip('color2 has 2 answers', () => {
        question.answers.should.have.property('color2')
        question.answers.color2.length.should.equal(2)
    })
    it.skip('is worth 1 points', () => {
        question.should.have.property('points', 1)
    })
})
