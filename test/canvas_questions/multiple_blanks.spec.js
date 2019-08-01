import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FillInMultipleBlanks as QuestionType } from '../../src/questions/multiple_blanks'
import qs from '../../src/questions'

describe('Fill In Multiple Blanks', () => {
    const canvas_question_obj = canvas_questions[3]
    const question = qs.fromCanvas(canvas_question_obj)

    it('is an instance of MultipleBlanks', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.text.should.equal(
            '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
        )
    })
    it('has correct number of total answers', () => {
        question.answers.should.have.lengthOf(3)
    })
    it('has correct answer groups', () => {
        question.answerObj.should.be
            .an('object')
            .that.has.all.keys('color1', 'color2')
    })
    it('color1 has 1 answers', () => {
        question.answerObj.color1.should.have.lengthOf(1)
    })
    it('color2 has 2 answers', () => {
        question.answerObj.color2.should.have.lengthOf(2)
    })
    it('all answers are labelled correct', () => {
        const [a, b, c] = question.answers

        a.isCorrect.should.be.true
        b.isCorrect.should.be.true
        c.isCorrect.should.be.true
    })
    it('is worth 1 points', () => {
        question.points.should.equal(1)
    })
})
