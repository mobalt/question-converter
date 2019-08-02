import 'chai/register-should'
import { describe } from 'mocha'
import { FileUpload } from '../../src/questions/fileupload'
import { fromSimple, toSimple } from '../../src/simple'

describe('FileUpload', () => {
    const simple_fu = {
        text: '<p>Upload your presentation in <b>*.pptx</b> format.</p>\n',
        type: 'File Upload',
    }
    const question = fromSimple(simple_fu)

    it('is an instance of FileUpload', function() {
        question.should.be.an.instanceOf(FileUpload)
    })
    it('has correct question label', function() {
        question.text.should.equal(
            '<p>Upload your presentation in <b>*.pptx</b> format.</p>',
        )
    })
    it('has correct number of answers', function() {
        question.answers.should.be.empty
    })
    it('worth correct number of points', function() {
        question.points.should.equal(1)
    })
})
