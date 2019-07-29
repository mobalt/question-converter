import 'chai/register-should'
import {describe} from "mocha"
import {MultipleAnswers} from "../src/questions/multiple_answers"

describe('Multiple Answers', () => {
	const simple_multianswers = {
		text: "<p> Two or more? <i>(select all that apply)</i></p>",
		points: 2,
		type: "Multiple Answers",
		answers: [
			"Wrong 1",
			"~ Right 1",
			"Wrong 2",
			"~Right 2",
			"Wrong 3"
		]
	}
	const question = MultipleAnswers.fromSimple(simple_multianswers)

	it('is an instance of MultipleAnswers', () => {
		question.should.be.an.instanceOf(MultipleAnswers)
	})
	it('has correct prompt', () => {
		question.should.have.property('text', '<p> Two or more? <i>(select all that apply)</i></p>')
	})
	it('has correct number of answers', () => {
		question.answers.length.should.equal(5)
	})
	it('correct answers are identified', () => {
		const [a, b, c, d, e] = question.answers

		b.should.have.property('isCorrect', true)
		d.should.have.property('isCorrect', true)
	})
	it('wrong answers are identified', () => {
		const [a, b, c, d, e] = question.answers

		a.should.have.property('isCorrect', false)
		c.should.have.property('isCorrect', false)
		e.should.have.property('isCorrect', false)
	})
	it('is worth 2 points', () => {
		question.should.have.property('points', 2)
	})
})
