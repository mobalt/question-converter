import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import qs from '../../src/questions'

describe('Short Answer', () => {
    const canvas_obj = {
        id: 3,
        question_name: 'Question3Name',
        points_possible: 1,
        question_text: '<p>Roses are _____. </p>',
        answers: [
            {
                id: 5611,
                comments_html: '<p>Nice typical answer.</p>',
                text: 'Red',
                weight: 100,
            },
            {
                id: 989,
                comments_html: '<p>Accurate.</p>',
                text: 'Smelly',
                weight: 100,
            },
        ],
        question_type: 'short_answer_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is correct instance', () => {
            question.should.be.an.instanceOf(qs.types.ShortAnswer)
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
        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[2]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
