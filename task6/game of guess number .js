const express = require('express')

const guessgame = express()
var R
guessgame.get('/start', (req, res) => {
	init()
	console.log(R, req.url)
	res.send(`
	<html><h2>OK</h2></html>
	`)
	return
})
guessgame.get('/:number', (req, res) => {
	let number = req.params.number
	compare(number, R, req, res)
	return
})


guessgame.listen(3000, () => {

	console.log('server start')
})


function init () {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	R = numb
}

function compare (a, b, request, respond) {
	if (a > b) {
		console.log('Bigger ->', request.params.number)
		respond.send(`
			<html><h2>Bigger</h2></html>
		`)
	} else if (a < b) {
		console.log('Smaller ->', request.params.number)
		respond.send(`
			<html><h2>Smaller</h2></html>
		`)
	} else {
		console.log('right ->', request.params.number)
		respond.send(`
			<html><h2>Guess right</h2></html>
		`)
		init()
		console.log(R)
	}

}