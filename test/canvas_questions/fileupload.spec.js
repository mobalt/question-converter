import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { FileUpload as QuestionType } from '../../src/questions/fileupload'
import qs from '../../src/questions'

describe('FileUpload', () => {
    const canvas_obj = {
        id: 9,
        question_name: 'File Upload',
        points_possible: 1,
        question_text: '<p>Upload your <strong>docx</strong> file.</p>',
        answers: [],
        question_type: 'file_upload_question',
    }

    describe('#fromCanvas', () => {
        const question = qs.fromCanvas(canvas_obj)

        it('is an instance of FileUpload', () => {
            question.should.be.an.instanceOf(qs.types.FileUpload)
        })

        it('has correct question label', function() {
            question.text.should.equal(
                '<p>Upload your <strong>docx</strong> file.</p>',
            )
        })

        it('has no answer items', function() {
            question.answers.should.be.an('array').but.empty
        })

        it('worth correct number of points', function() {
            question.points.should.equal(1)
        })

        it('can handle the extra fields of a full canvas object', () => {
            const canvas_obj_full_version = canvas_questions[8]
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
