import 'chai/register-should'
import { describe } from 'mocha'
import { TrueFalse } from '../../src/questions/truefalse'
import { QfromCanvas, QfromSimple } from '../../src/questions'

describe('True/False', () => {
    const simple_tf = {
        answer: true,
        text: 'Is this true?',
        type: 'True-or-False',
    }
    const question = QfromSimple(simple_tf)

    it('is an instance of correct class', function() {
        question.should.be.an.instanceOf(TrueFalse)
    })
    it('has correct question label', function() {
        question.text.should.equal('Is this true?')
    })
    it('has correct number of answers', function() {
        question.answers.length.should.equal(2)
    })
    it('correct answers are labelled as such', function() {
        const [t, f] = question.answers

        t.isCorrect.should.be.true
    })
    it('wrong answers work', function() {
        const [t, f] = question.answers

        f.isCorrect.should.be.false
    })
    it('worth correct number of points', function() {
        question.points.should.equal(1)
    })
})
