import 'chai/register-should'
import { describe } from 'mocha'
import { Text } from '../src/questions/text'

describe('Text', () => {
    const simple_text = {
        text: 'Just text.',
        type: 'Text',
    }

    const question = Text.fromSimple(simple_text)

    it('is an instance of Text', function() {
        question.should.be.an.instanceOf(Text)
    })
    it('has correct question label', function() {
        question.should.have.property('text', 'Just text.')
    })
    it('has no answer items', function() {
        should.not.exist(question.answers)
    })
    it('worth correct number of points', function() {
        question.should.have.property('points', 0)
    })
})
