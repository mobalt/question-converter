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

    describe('#toCanvas', () => {
        const { Answer } = qs.internal,
            { ShortAnswer } = qs.types

        const answers = [
            new Answer({ text: '1', isCorrect: true }),
            new Answer({ text: 'One', isCorrect: true }),
            new Answer({ text: '2', isCorrect: true }),
            new Answer({ text: 'Two', isCorrect: true }),
        ]
        const question = new ShortAnswer({
            text: 'What is one of the first two numbers?',
            name: 'Question',
            points: 1,
            answers,
        })
        const canvasObj = qs.toCanvas(question)

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
                .then(qs.fromCanvas)
                .then(qs.toCanvas)
                .then(qs.fromCanvas)
                .then(qs.toCanvas)
                .then(qs.fromCanvas)
                .then(qs.toCanvas)
                .then(qs.fromCanvas)
                .then(qs.toCanvas)

            new_canvas_obj.should.deep.equal(canvas_obj)
        })
    })
})
