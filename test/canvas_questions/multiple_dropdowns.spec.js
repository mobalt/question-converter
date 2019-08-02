import 'chai/register-should'
import { describe } from 'mocha'
import qs from '../../src/questions'
import canvas_questions from './questions'

describe('Multiple Dropdowns', () => {
    const canvas_obj = {
        id: 6,
        question_name: 'Multiple Dropdowns',
        points_possible: 1,
        question_text:
            '<p><span>Roses are [color1], violets are [color2]</span></p>',
        answers: [
            { id: 334, blank_id: 'color1', text: 'red', weight: 100 },
            { id: 7106, blank_id: 'color1', text: 'black', weight: 0 },
            { id: 2559, blank_id: 'color1', text: 'brown', weight: 0 },
            { id: 6714, blank_id: 'color2', text: 'blue', weight: 100 },
            {
                id: 731,
                blank_id: 'color2',
                text: 'purple (no html)',
                weight: 0,
            },
        ],
        question_type: 'multiple_dropdowns_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of MultipleDropdowns', () => {
            question.should.be.an.instanceOf(qs.types.MultipleDropdowns)
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

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[5]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
