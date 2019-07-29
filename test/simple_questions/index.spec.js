import 'chai/register-should'
import { describe } from 'mocha'
import { types, fromSimple } from '../../src/questions'

describe('#fromSimple', function() {
    it('should be an instance of Text', function() {
        const q = fromSimple({ type: 'Text' })
        q.should.be.instanceOf(types.Text)
    })
    it('should be an instance of MC', function() {
        const q = fromSimple({ type: 'Multiple Choice' })
        q.should.be.instanceOf(types.MultipleChoice)
    })
    // todo: add more types
})
