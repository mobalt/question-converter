import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleAnswers } from '../src/questions/multiple_answers'
import { Answer } from '../src/questions/generic'
import { fromCanvas, toCanvas } from '../index'

describe('Multiple Answers', () => {
    //const canvas_question_obj = canvas_questions[4]
    const canvas_obj = {
        id: 5,
        question_name: 'Multiple Answers',
        points_possible: 4,
        question_text:
            '<p>Solve. <img class="equation_image" title="\\sqrt{4}=?" src="http://fake.instructure.com/equation_images/%255Csqrt%257B4%257D%253D%253F" alt="LaTeX: \\sqrt{4}=?" data-equation-content="\\sqrt{4}=?"></p>',
        answers: [
            { id: 5414, text: '2', weight: 100 },
            { id: 2710, text: '-2', weight: 100 },
            { id: 4224, text: '4', weight: 0 },
            { id: 3390, text: '1', weight: 0 },
            {
                id: 2691,
                html: `<p><img class="equation_image" title="2i" src="http://fake.instructure.com/equation_images/2i" alt="LaTeX: 2i" data-equation-content="2i" x-canvaslms-safe-mathml='&lt;math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"&gt;&lt;mn&gt;2&lt;/mn&gt;&lt;mi&gt;i&lt;/mi&gt;&lt;/math&gt;'></p>`,
                weight: 0,
            },
        ],
        question_type: 'multiple_answers_question',
    }

    describe('#fromCanvas', () => {
        const question = fromCanvas(canvas_obj)

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p>Solve. <img class="equation_image" title="\\sqrt{4}=?" src="http://fake.instructure.com/equation_images/%255Csqrt%257B4%257D%253D%253F" alt="LaTeX: \\sqrt{4}=?" data-equation-content="\\sqrt{4}=?"></p>',
            )
        })

        it('has correct number of answers', () => {
            question.answers.should.have.lengthOf(5)
        })

        it('correct answers are identified', () => {
            const [a, b, c, d, e] = question.answers

            a.isCorrect.should.be.true
            b.isCorrect.should.be.true
        })

        it('wrong answers are identified', () => {
            const [a, b, c, d, e] = question.answers

            c.isCorrect.should.be.false
            d.isCorrect.should.be.false
            e.isCorrect.should.be.false
        })

        it('is worth 4 points', () => {
            question.points.should.equal(4)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[4]
            const fullQuestion = fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const question = {
            id: 5,
            text: 'Multiple answers',
            points: 123,
            name: 'Multiple Answers',
            type: 'Multiple Answers',
            answers: [
                { text: 'Correct 1', isCorrect: true },
                { text: 'Wrong 1', isCorrect: false },
                { text: 'Wrong 2', isCorrect: false },
                { text: '<b>Correct 2</b>', isCorrect: true },
            ],
            correct_comments: 'You are correct.',
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
                canvasObj.question_type.should.equal(
                    'multiple_answers_question',
                )
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    id: 5,
                    question_text: 'Multiple answers',
                    points_possible: 123,
                    question_name: 'Multiple Answers',
                })
            })

            describe('has #textHtml fields', () => {
                it('included fields', () => {
                    canvasObj.should.include({
                        correct_comments: 'You are correct.',
                    })
                })

                it('excluded fields', () => {
                    canvasObj.should.not.have.any.keys(
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

            it('have correct answer equal to 100', () => {
                a.weight.should.equal(100)
                d.weight.should.equal(100)
            })

            it('have wrong answers equal to 0', () => {
                b.weight.should.equal(0)
                c.weight.should.equal(0)
            })

            it('include correct text fields', () => {
                a.text.should.equal('Correct 1')
                b.text.should.equal('Wrong 1')
                c.text.should.equal('Wrong 2')
                d.html.should.equal('<b>Correct 2</b>')
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
