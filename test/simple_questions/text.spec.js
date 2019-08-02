import 'chai/register-should'
import { describe } from 'mocha'
import { Text } from '../../src/questions/text'
import { fromSimple, toSimple } from '../../src/simple'

describe('Text', () => {
    const simple_text = {
        text: 'Just text.',
        type: 'Text',
    }

    const question = fromSimple(simple_text)

    it('is an instance of Text', function() {
        question.should.be.an.instanceOf(Text)
    })
    it('has correct question label', function() {
        question.text.should.equal('Just text.')
    })
    it('has no answer items', function() {
        question.answers.should.be.empty
    })
    it('worth correct number of points', function() {
        question.points.should.equal(0)
    })
})
