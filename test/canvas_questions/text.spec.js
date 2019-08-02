import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import qs from '../../src/questions'

describe('Text', () => {
    const canvas_obj = {
        id: 10,
        question_name: 'Text',
        points_possible: 0,
        question_text: '<p>This has no question.</p>',
        answers: [],
        question_type: 'text_only_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of Text', function() {
            question.should.be.an.instanceOf(qs.types.Text)
        })

        it('has correct question label', function() {
            question.text.should.equal('<p>This has no question.</p>')
        })

        it('has no answer items', function() {
            question.answers.should.be.empty
        })

        it('worth correct number of points', function() {
            question.points.should.equal(0)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[9]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
