import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { fromCanvas, toCanvas } from '../../src/canvas'
import { MultipleChoice } from '../../src/questions/multiple_choice'

describe('Multiple Choice', () => {
    const canvas_obj = {
        id: 1,
        question_name: 'Question1Name',
        points_possible: 11,
        question_text:
            '<p><strong>Bold</strong>, <em>Italics</em>, <span style="text-decoration: underline;">Underline</span>.</p>',
        answers: [
            { id: 5227, text: 'Correct Ans', weight: 100 },
            { id: 7706, text: 'Wrong 1', weight: 0 },
            {
                id: 9981,
                html: '<p>Wrong 2<sup>2 </sup>= <strong>4</strong></p>',
                weight: 0,
            },
            { id: 5997, text: 'Wrong 3', weight: 0 },
            { id: 8180, text: 'Wrong 4', weight: 0 },
        ],
        question_type: 'multiple_choice_question',
    }

    describe('#fromCanvas', () => {
        const question = fromCanvas(canvas_obj)

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p><strong>Bold</strong>, <em>Italics</em>, <span style="text-decoration: underline;">Underline</span>.</p>',
            )
        })

        it('has correct number of answers', () => {
            question.answers.length.should.equal(5)
        })

        it('correct answers are identified', () => {
            const [a] = question.answers

            a.isCorrect.should.be.true
        })

        it('wrong answers are identified', () => {
            const [a, b, c, d, e] = question.answers

            b.isCorrect.should.be.false
            c.isCorrect.should.be.false
            d.isCorrect.should.be.false
            e.isCorrect.should.be.false
        })

        it('is worth 11 points', () => {
            question.points.should.equal(11)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[0]
            const fullQuestion = fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const question = new MultipleChoice({
            id: 999,
            text: '<p> Multiple Choice Text </p>',
            points: 1,
            name: 'MC Question 1',
            type: 'Multiple Choice',
            answers: [
                { text: 'Wrong 1', isCorrect: false },
                { text: 'Correct One', isCorrect: true },
                { text: 'Wrong 2', isCorrect: false },
                { text: '<b>Wrong 3</b>', isCorrect: false },
            ],
            correct_comments: '<b>Yay!</b>',
            incorrect_comments: 'Nay!',
        })
        const canvasObj = toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 4 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(4)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('multiple_choice_question')
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    id: 999,
                    question_text: '<p> Multiple Choice Text </p>',
                    points_possible: 1,
                    question_name: 'MC Question 1',
                })
            })

            describe('has #textHtml fields', () => {
                it('included fields', () => {
                    canvasObj.should.include({
                        correct_comments_html: '<b>Yay!</b>',
                        incorrect_comments: 'Nay!',
                    })
                })

                it('excluded fields', () => {
                    canvasObj.should.not.have.any.keys(
                        'correct_comments',
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

            it('have correct answer equal to 100', () => {
                b.weight.should.equal(100)
            })

            it('have wrong answers equal to 0', () => {
                a.weight.should.equal(0)
                c.weight.should.equal(0)
                d.weight.should.equal(0)
            })

            it('include correct text fields', () => {
                a.text.should.equal('Wrong 1')
                b.text.should.equal('Correct One')
                c.text.should.equal('Wrong 2')
                d.html.should.equal('<b>Wrong 3</b>')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
                c.should.not.include.keys('html')
                d.should.not.include.keys('text')
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
