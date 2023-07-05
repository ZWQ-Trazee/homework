const express = require('express')
const { createClient } = require('redis')
const guessgame = express()
const client = createClient()

client.connect()

client.get('R').then((data) => {
	console.log('R-->', data)
	if (data != null) {
		return
	}
	else {
		const R = init()
		client.set('R', R)
			.then(() => {
				client.get('R')
					.then((value) => {
						console.log('init set value -->', value)
					})
			})
	}
})


guessgame.get('/start', (req, res) => {
	res.send(`
	<html><h2>OK</h2></html>
	`)
})
guessgame.get('/:number', async (req, res) => {
	let guessnumber = req.params.number

	const R = await client.get('R')

	compare(guessnumber, Number(R), res)
})

guessgame.listen(3000, () => {
	console.log('server-3000 start')
})

function init () {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)

	return numb
}

function compare (a, b, respond) {
	if (a !== 'favicon.ico') {
		if (a > b) {
			console.log('Bigger ->', a)
			respond.send(`
			<html><h2>Bigger</h2></html>
		`)
		} else if (a < b) {
			console.log('Smaller ->', a)
			respond.send(`
			<html><h2>Smaller</h2></html>
		`)
		} else if (a == b) {
			console.log('right ->', a)
			respond.send(`
			<html><h2>Guess right</h2></html>
		`)
			const R = init()
			client.set('R', R).then(() => {
				client.get('R')
					.then((compareValue) => {
						console.log('compare set value -->', compareValue)
					})
			})
		}
	}
}