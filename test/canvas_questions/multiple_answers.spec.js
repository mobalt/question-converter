import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleAnswers as QuestionType } from '../../src/questions/multiple_answers'

describe.skip('Multiple Answers', () => {
    const canvas_question_obj = canvas_questions[4]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it.skip('is an instance of MultipleAnswers', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it.skip('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p> Two or more? <i>(select all that apply)</i></p>',
        )
    })
    it.skip('has correct number of answers', () => {
        question.answers.length.should.equal(5)
    })
    it.skip('correct answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        b.should.have.property('isCorrect', true)
        d.should.have.property('isCorrect', true)
    })
    it.skip('wrong answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        a.should.have.property('isCorrect', false)
        c.should.have.property('isCorrect', false)
        e.should.have.property('isCorrect', false)
    })
    it.skip('is worth 2 points', () => {
        question.should.have.property('points', 2)
    })
})
