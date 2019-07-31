import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { ShortAnswer as QuestionType } from '../../src/questions/short_answer'

describe('Short Answer', () => {
    const canvas_question_obj = canvas_questions[2]
    const question = QuestionType.fromCanvas(canvas_question_obj)

    it('is correct instance', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.text.should.equal('<p>Roses are _____. </p>')
    })
    it('has correct number of answers', () => {
        question.answers.should.have.lengthOf(2)
    })
    it('has all answers correct', () => {
        const [a, b] = question.answers
        a.isCorrect.should.be.true
        b.isCorrect.should.be.true
    })
    it('is worth 1 points', () => {
        question.points.should.equal(1)
    })
})
