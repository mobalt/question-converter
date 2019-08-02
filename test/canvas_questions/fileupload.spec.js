import 'chai/register-should'
import { describe } from 'mocha'
import canvas_questions from './questions'
import { fromCanvas, toCanvas } from '../../src/canvas'
import { FileUpload } from '../../src/questions/fileupload'

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
        const question = fromCanvas(canvas_obj)

        it('is an instance of FileUpload', () => {
            question.should.be.an.instanceOf(FileUpload)
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
            const fullQuestion = fromCanvas(canvas_obj_full_version)
            fullQuestion.should.deep.equal(question)
        })
    })

    describe('#toCanvas', () => {
        const question = new FileUpload({
            id: 888,
            text: 'Please upload your file.',
            points: 111,
            name: 'File Upload Question',
            type: 'File Upload',
        })
        const canvasObj = toCanvas(question)

        describe('The canvas question object', () => {
            it('is a normal javascript object', () => {
                canvasObj.should.be.an.instanceOf(Object)
            })

            it('has zero answers', () => {
                canvasObj.answers.should.be.an('array').with.lengthOf(0)
            })

            it('has canvas specific question_type', () => {
                canvasObj.question_type.should.equal('file_upload_question')
            })

            it('has #oneToOne fields', () => {
                canvasObj.should.include({
                    id: 888,
                    question_text: 'Please upload your file.',
                    points_possible: 111,
                    question_name: 'File Upload Question',
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
