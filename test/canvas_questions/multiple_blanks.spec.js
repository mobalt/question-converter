import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FillInMultipleBlanks as QuestionType } from '../../src/questions/multiple_blanks'

describe('Fill In Multiple Blanks', () => {
    const canvas_question_obj = canvas_questions[3]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleBlanks', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
        )
    })
    it('has correct number of answer groups', () => {
        Object.keys(question.answers).length.should.equal(3)
    })
    it.skip('color1 has 3 answers', () => {
        question.answers.should.have.property('color1')
        question.answers.color1.length.should.equal(3)
    })
    it.skip('color2 has 2 answers', () => {
        question.answers.should.have.property('color2')
        question.answers.color2.length.should.equal(2)
    })
    it('is worth 1 points', () => {
        question.should.have.property('points', 1)
    })
})
