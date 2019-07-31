import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleChoice as QuestionType } from '../../src/questions/multiple_choice'

describe('Multiple Choice', () => {
    const canvas_question_obj = canvas_questions[0]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleChoice', () => {
        question.should.be.an.instanceOf(QuestionType)
    })

    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p><strong>Bold</strong>, <em>Italics</em>, <span style="text-decoration: underline;">Underline</span>.</p>',
        )
    })

    it('has correct number of answers', () => {
        question.answers.length.should.equal(5)
    })

    it('correct answers are identified', () => {
        const [a] = question.answers

        a.should.have.property('isCorrect', true)
    })

    it('wrong answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
        d.isCorrect.should.be.false
        e.isCorrect.should.be.false
    })

    it('is worth 1 point', () => {
        question.should.have.property('points', 11)
    })
})