import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import qs from '../../src/questions'

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
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of MultipleChoice', () => {
            question.should.be.an.instanceOf(qs.types.MultipleChoice)
        })

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
            const fullQuestion = qs.fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })


    })

    })
})
