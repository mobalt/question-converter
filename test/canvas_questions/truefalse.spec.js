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

    describe('#toCanvas', () => {
        const { Answer } = qs.internal,
            { TrueFalse } = qs.types

        const question = new TrueFalse({
            text: 'Is this true?',
            name: 'A True-or-False Question',
            points: 1,
            answers: [
                new Answer({ text: 'True', isCorrect: true }),
                new Answer({ text: 'False', isCorrect: false }),
            ],
        })
        const canvasObj = qs.toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 2 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(2)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('true_false_question')
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text: 'Is this true?',
                    points_possible: 1,
                    question_name: 'A True-or-False Question',
                })
            })

            describe('has #textHtml fields', () => {
                it('has all fields excluded', () => {
                    canvasObj.should.not.have.any.keys(
                        'correct_comments',
                        'correct_comments_html',
                        'incorrect_comments',
                        'incorrect_comments_html',
                        'neutral_comments',
                        'neutral_comments_html',
                    )
                })
            })
        })

        describe('The canvas answer objects', () => {
            const [a, b] = canvasObj.answers

            it('are basic javascript types', () => {
                a.should.be.an.instanceOf(Object)
                b.should.be.an.instanceOf(Object)
            })

            it('have correct answer equal to 100', () => {
                a.weight.should.equal(100)
            })

            it('have wrong answers equal to 0', () => {
                b.weight.should.equal(0)
            })

            it('include correct text fields', () => {
                a.text.should.equal('True')
                b.text.should.equal('False')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
            })
        })
    })
})
