import 'chai/register-should'
import { describe } from 'mocha'
import qs from '../../src/questions'
import canvas_questions from './questions'

describe('Essay', () => {
    const canvas_obj = {
        id: 8,
        question_name: 'Essay',
        points_possible: 1,
        question_text: '<p>Type an essay.</p>',
        answers: [],
        question_type: 'essay_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is correct instance', function() {
            question.should.be.an.instanceOf(qs.types.Essay)
        })

        it('has correct question label', function() {
            question.text.should.equal('<p>Type an essay.</p>')
        })

        it('has no answer items', function() {
            question.answers.should.be.empty
        })

        it('worth correct number of points', function() {
            question.points.should.equal(1)
        })

        it('can handle extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[7]
            const full_question = qs.fromCanvas(canvas_obj_full_version)
            full_question.should.deep.equal(question)
        })
    })


})
