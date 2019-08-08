import 'chai/register-should'
import { describe } from 'mocha'
import { Essay } from '../../src/questions/essay'
import { fromSimple, toSimple } from '../../src/simple'

describe('Essay', () => {
    const simple_essay = {
        text: 'Write a 500-word essay below:',
        type: 'Essay',
    }

    describe('#fromSimple', () => {
        const question = fromSimple(simple_essay)

        it('is an instance of Essay', function() {
            console.log('<><>',question.constructor.name)
            question.should.be.an.instanceOf(Essay)
        })

        it('has correct question label', function() {
            question.text.should.equal('Write a 500-word essay below:')
        })

        it('has no answer items', function() {
            question.answers.should.be.empty
        })

        it('worth correct number of points', function() {
            question.points.should.equal(1)
        })

    })

    describe('#toSimple', () => {
        const question = new Essay({
            name: 'Essay Question',
            text: 'Write an essay:',
            answers: [],
            question_type: 'essay_question',
            correct_comments: 'Correct Text',
            incorrect_comments: '<b>Incorrect</b> html',
        })
        const canvasObj = toSimple(question)

        describe.skip('The canvas object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has 0 answers', () => {
                //console.log(canvasObj)
                canvasObj.should.not.have.any.keys('answers')
            })

            it.skip('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('essay_question')
            })

            it.skip('has #oneToOne fields', () => {
                canvasObj.should.include({
                    question_text: 'Write an essay:',
                    points_possible: 1,
                    question_name: 'Essay Question',
                })
            })

            describe.skip('has #textHtml fields', () => {
                it.skip('included fields', () => {
                    canvasObj.should.include({
                        correct_comments: 'Correct Text',
                        incorrect_comments_html: '<b>Incorrect</b> html',
                    })
                })

                it.skip('excluded fields', () => {
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
})
