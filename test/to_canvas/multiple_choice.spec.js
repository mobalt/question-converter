import 'chai/register-should'
import { describe } from 'mocha'
import qs from '../../src/questions'

describe.only('Multiple Choice', () => {
    describe('#toCanvas', () => {
        const simple = {
            id: 999,
            text: '<p> Multiple Choice Text </p>',
            points: 1,
            name: 'MC Question 1',
            type: 'Multiple Choice',
            answers: ['~ Correct One', 'Wrong 1', '<b>Wrong 2</b>'],
            correct_comments: '<b>Yay!</b>',
            incorrect_comments: 'Nay!',
        }

        const question = qs.fromSimple(simple)
        const canvasObj = qs.toCanvas(question)

        //# reference_obj is derived by console.log:
        //console.log(canvasObj)
        const reference_obj = {
            id: 999,
            question_name: 'MC Question 1',
            points_possible: 1,
            question_text: '<p> Multiple Choice Text </p>',
            correct_comments_html: '<b>Yay!</b>',
            incorrect_comments: 'Nay!',
            answers: [
                { text: 'Correct One', weight: 100 },
                { text: 'Wrong 1', weight: 0 },
                { html: '<b>Wrong 2</b>', weight: 0 },
            ],
            question_type: 'multiple_choice_question',
        }

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 3 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(3)
            })

            it('has correct question_type', () => {
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
                    canvasObj.should.not.include.keys([
                        'correct_comments',
                        'incorrect_comments_html',
                        // TODO:
                        //    'neutral_comments', 'neutral_comments_html'
                    ])
                })
            })
        })

        describe('The canvas answer objects', () => {
            const [a, b, c] = canvasObj.answers

            it('are basic javascript types', () => {
                a.should.be.an.instanceOf(Object)
                b.should.be.an.instanceOf(Object)
                c.should.be.an.instanceOf(Object)
            })

            it('have correct answer equal to 100', () => {
                a.weight.should.equal(100)
            })

            it('have wrong answers equal to 0', () => {
                b.weight.should.equal(0)
                c.weight.should.equal(0)
            })

            it('include correct text fields', () => {
                a.text.should.equal('Correct One')
                b.text.should.equal('Wrong 1')
                c.html.should.equal('<b>Wrong 2</b>')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
                c.should.not.include.keys('text')
            })
        })
    })
})
