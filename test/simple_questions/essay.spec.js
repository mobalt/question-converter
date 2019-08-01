import 'chai/register-should'
import { describe } from 'mocha'
import { Essay } from '../../src/questions/essay'
import qs from '../../src/questions'

describe('Essay', () => {
    const simple_essay = {
        text: 'Write a 500-word essay below:',
        type: 'Essay',
    }

    const question = qs.fromSimple(simple_essay)

    it('is an instance of Essay', function() {
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
