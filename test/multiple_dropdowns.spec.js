import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { fromCanvas, toCanvas } from '../index'
import { MultipleDropdowns } from '../src/questions/multiple_dropdowns'

describe('Multiple Dropdowns', () => {
    const canvas_obj = {
        id: 6,
        question_name: 'Multiple Dropdowns',
        points_possible: 1,
        question_text:
            '<p><span>Roses are [color1], violets are [color2]</span></p>',
        answers: [
            { id: 334, blank_id: 'color1', text: 'red', weight: 100 },
            { id: 7106, blank_id: 'color1', text: 'black', weight: 0 },
            { id: 2559, blank_id: 'color1', text: 'brown', weight: 0 },
            { id: 6714, blank_id: 'color2', text: 'blue', weight: 100 },
            {
                id: 731,
                blank_id: 'color2',
                text: 'purple (no html)',
                weight: 0,
            },
        ],
        question_type: 'multiple_dropdowns_question',
    }

    describe('#fromCanvas', () => {
        const question = fromCanvas(canvas_obj)

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p><span>Roses are [color1], violets are [color2]</span></p>',
            )
        })

        it('has correct number of total answers', () => {
            question.answers.should.have.lengthOf(5)
        })

        it.skip('has correct answer groups', () => {
            question.answerObj.should.be
                .an('object')
                .that.has.all.keys('color1', 'color2')
        })

        it.skip('color1 group is correct', () => {
            const sublist = question.answerObj.color1

            sublist.should.have.lengthOf(3)

            const [a, b, c] = sublist
            a.isCorrect.should.be.true
            b.isCorrect.should.be.false
            c.isCorrect.should.be.false
        })

        it.skip('color2 group is correct', () => {
            const sublist = question.answerObj.color2

            sublist.should.have.lengthOf(2)

            const [a, b] = sublist
            a.isCorrect.should.be.true
            b.isCorrect.should.be.false
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[5]
            const fullQuestion = fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const answers = [
            { text: 'blue', isCorrect: true, group: 'd2' },
            { text: 'ugly', isCorrect: false, group: 'd2' },
            { text: '42', isCorrect: false, group: 'd2' },
            { text: 'wrong', isCorrect: false, group: 'd2' },
            { text: 'red', isCorrect: true, group: 'd1' },
            { text: 'green', isCorrect: false, group: 'd1' },
            { text: 'blue', isCorrect: false, group: 'd1' },
        ]
        const question = {
            text: 'Roses = [d1], Violets = [d2]',
            name: 'Question',
            points: 1,
            type: 'Multiple Dropdowns',
            answers,
        }
        const canvasObj = toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 7 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(7)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal(
                    'multiple_dropdowns_question',
                )
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text: 'Roses = [d1], Violets = [d2]',
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
            const [a, b, c, d, e, f, g] = canvasObj.answers

            it('are basic javascript types', () => {
                a.should.be.an.instanceOf(Object)
                b.should.be.an.instanceOf(Object)
                c.should.be.an.instanceOf(Object)
                d.should.be.an.instanceOf(Object)
                e.should.be.an.instanceOf(Object)
                f.should.be.an.instanceOf(Object)
                g.should.be.an.instanceOf(Object)
            })

            it('belong to correct groups', () => {
                a.blank_id.should.equal('d2')
                b.blank_id.should.equal('d2')
                c.blank_id.should.equal('d2')
                d.blank_id.should.equal('d2')
                e.blank_id.should.equal('d1')
                f.blank_id.should.equal('d1')
                g.blank_id.should.equal('d1')
            })

            it('have correct answers equal to 100', () => {
                a.weight.should.equal(100)
                e.weight.should.equal(100)
            })

            it('have wrong answers equal to 0', () => {
                b.weight.should.equal(0)
                c.weight.should.equal(0)
                d.weight.should.equal(0)
                f.weight.should.equal(0)
                g.weight.should.equal(0)
            })

            it('include correct text fields', () => {
                a.text.should.equal('blue')
                b.text.should.equal('ugly')
                c.text.should.equal('42')
                d.text.should.equal('wrong')
                e.text.should.equal('red')
                f.text.should.equal('green')
                g.text.should.equal('blue')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
                c.should.not.include.keys('html')
                d.should.not.include.keys('html')
                e.should.not.include.keys('html')
                f.should.not.include.keys('html')
                g.should.not.include.keys('html')
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
