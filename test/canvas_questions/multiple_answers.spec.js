import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleAnswers as QuestionType } from '../../src/questions/multiple_answers'
import { Answer } from '../../src/questions/generic'
import qs from '../../src/questions'

describe('Multiple Answers', () => {
    const canvas_question_obj = canvas_questions[4]
    const question = qs.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleAnswers', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.text.should.equal(
            '<p>Solve. <img class="equation_image" title="\\sqrt{4}=?" src="http://fake.instructure.com/equation_images/%255Csqrt%257B4%257D%253D%253F" alt="LaTeX: \\sqrt{4}=?" data-equation-content="\\sqrt{4}=?"></p>',
        )
    })
    it('has correct number of answers', () => {
        question.answers.should.have.lengthOf(5)
    })
    it('all answers are instances of Answer', () => {
        question.answers.forEach(ans => {
            ans.should.be.instanceOf(Answer)
        })
    })
    it('correct answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        a.isCorrect.should.be.true
        b.isCorrect.should.be.true
    })
    it('wrong answers are identified', () => {
        const [a, b, c, d, e] = question.answers

        c.isCorrect.should.be.false
        d.isCorrect.should.be.false
        e.isCorrect.should.be.false
    })
    it('is worth 4 points', () => {
        question.points.should.equal(4)
    })
})
