import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import qs from '../../src/questions'

describe('True/False', () => {
    const canvas_obj = {
        id: 2,
        question_name: 'Question2Name',
        points_possible: 2,
        question_text: '<p>Is this true?</p>',
        correct_comments_html: '<p><strong>Positive</strong> comment. :-)</p>',
        incorrect_comments_html:
            '<p><strong>Negative</strong> comment. :-(</p>',
        neutral_comments_html: '<p>General comment.</p>',
        answers: [
            { id: 8974, text: 'True', weight: 100 },
            { id: 9876, text: 'False', weight: 0 },
        ],
        question_type: 'true_false_question',
    }


    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of correct class', function() {
            question.should.be.an.instanceOf(qs.types.TrueFalse)
        })

        it('has correct question label', function() {
            question.text.should.equal('<p>Is this true?</p>')
        })

        it('has correct number of answers', function() {
            question.answers.should.have.lengthOf(2)
        })

        it('has only one answer labelled correct', function() {
            const [t, f] = question.answers

            t.isCorrect.should.be.true
            f.isCorrect.should.be.false
        })

        it('worth correct number of points', function() {
            question.points.should.equal(2)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[1]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })
})
