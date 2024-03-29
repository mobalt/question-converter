import 'chai/register-should'
import { describe } from 'mocha'
import { Essay } from '../src/questions/essay'
import { fromCanvas, toCanvas } from '../index'
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
        const question = fromCanvas(canvas_obj)

        it('is correct instance', function() {
            question.should.be.an.instanceOf(Object)
        })

        it('has correct question label', function() {
            question.text.should.equal('<p>Type an essay.</p>')
        })

        it('has no answer items', function() {
            question.answers.should.be.empty
        })

        it('worth correct number of points', function() {
            // question.points.should.equal(1)
            question.should.not.have.any.keys('points')
        })

        it('can handle extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[7]
            const full_question = fromCanvas(canvas_obj_full_version)
            full_question.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const question = {
            name: 'Essay Question',
            text: 'Write an essay:',
            answers: [],
            type: 'Essay',
            correct_comments: 'Correct Text',
            incorrect_comments: '<b>Incorrect</b> html',
        }
        const canvasObj = toCanvas(question)

        describe('The canvas object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 0 answers', () => {
                canvasObj.answers.should.be.an('array').but.empty
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('essay_question')
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text: 'Write an essay:',
                    points_possible: 1,
                    question_name: 'Essay Question',
                })
            })

            describe('has #textHtml fields', () => {
                it('included fields', () => {
                    canvasObj.should.include({
                        correct_comments: 'Correct Text',
                        incorrect_comments_html: '<b>Incorrect</b> html',
                    })
                })

                it('excluded fields', () => {
                    canvasObj.should.not.have.any.keys(
                        'correct_comments_html',
                        'incorrect_comments',
                        'neutral_comments',
                        'neutral_comments_html',
                    )
                })
            })
        })
    })

    describe('Idempotency', () => {
        it('can convert from/to canvas objects, without loss of data', async () => {
            // do it 4x!!!
            const new_canvas_obj = await Promise.resolve(canvas_obj)
                .then(fromCanvas)
                .then(toCanvas)
                .then(fromCanvas)
                .then(toCanvas)
                .then(fromCanvas)
                .then(toCanvas)
                .then(fromCanvas)
                .then(toCanvas)

            new_canvas_obj.should.deep.equal(canvas_obj)
        })
    })
})
