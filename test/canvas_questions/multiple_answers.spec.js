import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleAnswers as QuestionType } from '../../src/questions/multiple_answers'

describe('Multiple Answers', () => {
    const canvas_question_obj = canvas_questions[4]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleAnswers', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.should.have.property(
            'text',
            '<p>Solve. <img class="equation_image" title="\\sqrt{4}=?" src="http://fake.instructure.com/equation_images/%255Csqrt%257B4%257D%253D%253F" alt="LaTeX: \\sqrt{4}=?" data-equation-content="\\sqrt{4}=?"></p>',
        )
    })
    it('has correct number of answers', () => {
        question.answers.length.should.equal(5)
    })
    it('correct answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        a.should.have.property('isCorrect', true)
        b.should.have.property('isCorrect', true)
    })
    it('wrong answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        c.should.have.property('isCorrect', false)
        d.should.have.property('isCorrect', false)
        e.should.have.property('isCorrect', false)
    })
    it('is worth 4 points', () => {
        question.should.have.property('points', 4)
    })
})
