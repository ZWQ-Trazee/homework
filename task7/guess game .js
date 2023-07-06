const express = require('express')
const { createClient } = require('redis')
const guessgame = express()
const client = createClient()

const Arry = process.argv.slice(2)
const port = Arry[0]

client.connect()

client.get('R').then((data) => {
	console.log('R-->', data)
	if (data != null) {
		return
	}
	else {
		setstorenum()
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

guessgame.listen(port, () => {
	console.log('server-start  port-->' + port)
})

function init () {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)

	return numb
}

async function setstorenum () {
	const R = init()
	await client.set('R', R)
	const storevalue = await client.get('R')

	console.log('storevalue -->', storevalue)
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
			setstorenum()
		}
	}
}


