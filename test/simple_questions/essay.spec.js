import 'chai/register-should'
import { describe } from 'mocha'
import { Essay } from '../../src/questions/essay'

describe('Essay', () => {
    const simple_essay = {
        text: 'Write a 500-word essay below:',
        type: 'Essay',
    }

    const question = Essay.fromSimple(simple_essay)

    it('is an instance of Essay', function() {
        question.should.be.an.instanceOf(Essay)
    })
    it('has correct question label', function() {
        question.should.have.property('text', 'Write a 500-word essay below:')
    })
    it('has no answer items', function() {
        should.not.exist(question.answers)
    })
    it('worth correct number of points', function() {
        question.should.have.property('points', 1)
    })
})
