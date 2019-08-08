import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { fromCanvas, toCanvas } from '../../src/canvas'
import { ShortAnswer } from '../../src/questions/short_answer'

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
        const question = fromCanvas(canvas_obj)

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
        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[2]
            const fullQuestion = fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const question = {
            text: 'What is one of the first two numbers?',
            name: 'Question',
            points: 1,
            answers: [
                { text: '1', isCorrect: true },
                { text: 'One', isCorrect: true },
                { text: '2', isCorrect: true },
                { text: 'Two', isCorrect: true },
            ],
            type: 'Short Answer',
        }
        const canvasObj = toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 4 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(4)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('short_answer_question')
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text: 'What is one of the first two numbers?',
                    points_possible: 1,
                    question_name: 'Question',
                })
            })

            describe('has #textHtml fields', () => {
                it('all fields are excluded', () => {
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
            const [a, b, c, d] = canvasObj.answers

            it('are basic javascript types', () => {
                a.should.be.an.instanceOf(Object)
                b.should.be.an.instanceOf(Object)
                c.should.be.an.instanceOf(Object)
                d.should.be.an.instanceOf(Object)
            })

            it('has all answers equal to 100', () => {
                a.weight.should.equal(100)
                b.weight.should.equal(100)
                c.weight.should.equal(100)
                d.weight.should.equal(100)
            })

            it('include correct text fields', () => {
                a.text.should.equal('1')
                b.text.should.equal('One')
                c.text.should.equal('2')
                d.text.should.equal('Two')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
                c.should.not.include.keys('html')
                d.should.not.include.keys('html')
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
