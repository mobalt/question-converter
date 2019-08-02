import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FillInMultipleBlanks as QuestionType } from '../../src/questions/multiple_blanks'
import qs from '../../src/questions'

describe('Fill In Multiple Blanks', () => {
    const canvas_obj = {
        id: 4,
        question_name: 'Fill In Multiple Blanks',
        points_possible: 1,
        question_text:
            '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
        answers: [
            { id: 4356, blank_id: 'color1', text: 'red', weight: 100 },
            { id: 8988, blank_id: 'color2', text: 'blue', weight: 100 },
            { id: 6053, blank_id: 'color2', text: 'violet', weight: 100 },
        ],
        question_type: 'fill_in_multiple_blanks_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of MultipleBlanks', () => {
            question.should.be.an.instanceOf(qs.types.FillInMultipleBlanks)
        })

        it('has correct prompt', () => {
            question.text.should.equal(
                '<p><span>Roses <strong>are</strong> [color1], violets <strong>are</strong> [color2]</span></p>',
            )
        })

        it('has correct number of answers', () => {
            question.answers.should.have.lengthOf(3)
        })

        it('all answers are instances of Answer', () => {
            const [a, b, c, d, e] = question.answers
            const Answer = qs.internal.Answer

            a.should.be.instanceOf(Answer)
            b.should.be.instanceOf(Answer)
            c.should.be.instanceOf(Answer)
        })

        it('has correct answer groups', () => {
            question.answerObj.should.be
                .an('object')
                .that.has.all.keys('color1', 'color2')
        })

        it('color1 has 1 answers', () => {
            question.answerObj.color1.should.have.lengthOf(1)
        })

        it('color2 has 2 answers', () => {
            question.answerObj.color2.should.have.lengthOf(2)
        })

        it('all answers are labelled correct', () => {
            const [a, b, c] = question.answers

            a.isCorrect.should.be.true
            b.isCorrect.should.be.true
            c.isCorrect.should.be.true
        })

        it('is worth 1 points', () => {
            question.points.should.equal(1)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[3]
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const { Answer } = qs.internal,
            { FillInMultipleBlanks } = qs.types

        const answers = [
            new Answer({ text: 'red', isCorrect: true, group: 'color1' }),
            new Answer({ text: 'pink', isCorrect: true, group: 'color1' }),
            new Answer({ text: 'white', isCorrect: true, group: 'color1' }),
            new Answer({ text: 'blue', isCorrect: true, group: 'color2' }),
            new Answer({ text: 'violet', isCorrect: true, group: 'color2' }),
        ]
        const question = new FillInMultipleBlanks({
            text: '<p>Roses are [color1], violets are [color2]</p>',
            name: 'Question',
            points: 1,
            answers,
        })
        const canvasObj = qs.toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 5 answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(5)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal(
                    'fill_in_multiple_blanks_question',
                )
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text:
                        '<p>Roses are [color1], violets are [color2]</p>',
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
            const [a, b, c, d, e] = canvasObj.answers

            it('are basic javascript types', () => {
                a.should.be.an.instanceOf(Object)
                b.should.be.an.instanceOf(Object)
                c.should.be.an.instanceOf(Object)
                d.should.be.an.instanceOf(Object)
                e.should.be.an.instanceOf(Object)
            })

            it('belong to correct groups', () => {
                a.blank_id.should.equal('color1')
                b.blank_id.should.equal('color1')
                c.blank_id.should.equal('color1')
                d.blank_id.should.equal('color2')
                e.blank_id.should.equal('color2')
            })

            it('has all answers marked as correct (weight=100)', () => {
                a.weight.should.equal(100)
                b.weight.should.equal(100)
                c.weight.should.equal(100)
                d.weight.should.equal(100)
                e.weight.should.equal(100)
            })

            it('include correct text fields', () => {
                a.text.should.equal('red')
                b.text.should.equal('pink')
                c.text.should.equal('white')
                d.text.should.equal('blue')
                e.text.should.equal('violet')
            })

            it('exclude wrong text fields', () => {
                a.should.not.include.keys('html')
                b.should.not.include.keys('html')
                c.should.not.include.keys('html')
                d.should.not.include.keys('html')
                e.should.not.include.keys('html')
            })
        })
    })
})
