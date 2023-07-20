const express = require('express')
const { createClient } = require('redis')
const guessgame = express()
const client = createClient()

const Arry = process.argv.slice(2)
const port = Arry[0]

guessgame.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'PUT,GET,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'X-Requestd-With')
	res.header('Access-Control-Allow-Headers', 'Content-Type')
	next()
})

client.connect()

client.get('R').then((data) => {
	console.log('R-->', data)
	if (data != null) {
		return
	}
	else {
		return setstorenum()
	}
})

guessgame.get('/restart', (req, res) => {
	res.send({ data: 'OK' })
})

guessgame.get('/:number', async (req, res) => {
	console.log('url-->', req.url)
	let guessnumber = await req.params.number	
	if (guessnumber === 'favicon.ico')
		res.status(404).send('<div>404 Not Found</div>')
	else {
		const R =  await client.get('R')
		res.send({ data: await compare(guessnumber, R) })
	}
})

guessgame.listen(port, () => {
	console.log('server-start  port-->' + port)
})

function init() {
	let numb = Math.random()
	numb = Math.ceil(numb * 1000000)
	return numb
}

async function setstorenum() {
	const R = init()
	await client.set('R', R)
	console.log('R -->', R)
}

async function compare(a, b) {
	if (a > b) {
		return 'Bigger'
	} else if (a < b) {
		return 'Smaller'
	} else if (a === b) {
		await setstorenum()
		return 'Guess Right'
	}
}