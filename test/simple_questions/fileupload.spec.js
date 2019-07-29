import 'chai/register-should'
import { describe } from 'mocha'
import { FileUpload } from '../../src/questions/fileupload'

describe('FileUpload', () => {
    const simple_fu = {
        text: '<p>Upload your presentation in <b>*.pptx</b> format.</p>\n',
        type: 'File Upload',
    }
    const question = FileUpload.fromSimple(simple_fu)

    it('is an instance of FileUpload', function() {
        question.should.be.an.instanceOf(FileUpload)
    })
    it('has correct question label', function() {
        question.should.have.property(
            'text',
            '<p>Upload your presentation in <b>*.pptx</b> format.</p>',
        )
    })
    it('has correct number of answers', function() {
        should.not.exist(question.answers)
    })
    it('worth correct number of points', function() {
        question.should.have.property('points', 1)
    })
})
