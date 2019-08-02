import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FillInMultipleBlanks as QuestionType } from '../../src/questions/multiple_blanks'
import qs from '../../src/questions'

describe('Fill In Multiple Blanks', () => {
    const canvas_obj = {
        id: 4,
        question_name: 'Fill In Multiple Blanks',
        points_possible: 1,
        question_text:
            '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
        answers: [
            { id: 4356, blank_id: 'color1', text: 'red', weight: 100 },
            { id: 8988, blank_id: 'color2', text: 'blue', weight: 100 },
            { id: 6053, blank_id: 'color2', text: 'violet', weight: 100 },
        ],
        question_type: 'fill_in_multiple_blanks_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of MultipleBlanks', () => {
            question.should.be.an.instanceOf(qs.types.FillInMultipleBlanks)
        })

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
            )
        })

        it('has correct number of answers', () => {
            question.answers.should.have.lengthOf(3)
        })

        it('all answers are instances of Answer', () => {
            const [a, b, c, d, e] = question.answers
            const Answer = qs.internal.Answer

            a.should.be.instanceOf(Answer)
            b.should.be.instanceOf(Answer)
            c.should.be.instanceOf(Answer)
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

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[3]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
