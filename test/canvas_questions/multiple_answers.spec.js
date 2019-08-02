import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { MultipleAnswers as QuestionType } from '../../src/questions/multiple_answers'
import { Answer } from '../../src/questions/generic'
import qs from '../../src/questions'

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
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of MultipleAnswers', () => {
            question.should.be.an.instanceOf(qs.types.MultipleAnswers)
        })

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p>Solve. <img class="equation_image" title="\\sqrt{4}=?" src="http://fake.instructure.com/equation_images/%255Csqrt%257B4%257D%253D%253F" alt="LaTeX: \\sqrt{4}=?" data-equation-content="\\sqrt{4}=?"></p>',
            )
        })

        it('has correct number of answers', () => {
            question.answers.should.have.lengthOf(5)
        })

        it('all answers are instances of Answer', () => {
            const [a, b, c, d, e] = question.answers
            const Answer = qs.internal.Answer
            a.should.be.instanceOf(Answer)
            b.should.be.instanceOf(Answer)
            c.should.be.instanceOf(Answer)
            d.should.be.instanceOf(Answer)
            e.should.be.instanceOf(Answer)
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
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const Answer = qs.internal.Answer,
            MultipleChoice = qs.types.MultipleChoice

        const question = new MultipleChoice({
            id: 999,
            text: '<p> Multiple Choice Text </p>',
            points: 1,
            name: 'MC Question 1',
            type: 'Multiple Choice',
            answers: [
                new Answer({ text: 'Wrong 1', isCorrect: false }),
                new Answer({ text: 'Correct One', isCorrect: true }),
                new Answer({ text: 'Wrong 2', isCorrect: false }),
                new Answer({ text: '<b>Wrong 3</b>', isCorrect: false }),
            ],
            correct_comments: '<b>Yay!</b>',
            incorrect_comments: 'Nay!',
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
})
