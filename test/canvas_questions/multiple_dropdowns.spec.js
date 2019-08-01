import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleDropdowns as QuestionType } from '../../src/questions/multiple_dropdowns'
import { QfromCanvas, QfromSimple } from '../../src/questions'

describe('Multiple Dropdowns', () => {
    const canvas_question_obj = canvas_questions[5]
    const question = QfromCanvas(canvas_question_obj)

    it('is an instance of MultipleDropdowns', () => {
        question.should.be.an.instanceOf(QuestionType)
    })
    it('has correct prompt', () => {
        question.text.should.equal(
            '<p><span>Roses are [color1], violets are [color2]</span></p>',
        )
    })
    it('has correct number of total answers', () => {
        question.answers.should.have.lengthOf(5)
    })
    it('has correct answer groups', () => {
        question.answerObj.should.be
            .an('object')
            .that.has.all.keys('color1', 'color2')
    })
    it('color1 group is correct', () => {
        const sublist = question.answerObj.color1

        sublist.should.have.lengthOf(3)

        const [a, b, c] = sublist
        a.isCorrect.should.be.true
        b.isCorrect.should.be.false
        c.isCorrect.should.be.false
    })
    it('color2 group is correct', () => {
        const sublist = question.answerObj.color2

        sublist.should.have.lengthOf(2)

        const [a, b] = sublist
        a.isCorrect.should.be.true
        b.isCorrect.should.be.false
    })
    it('is worth 1 point', () => {
        question.points.should.equal(1)
    })
})
