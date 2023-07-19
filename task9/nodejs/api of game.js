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


guessgame.get('/api/restart/:number', async (req, res) => {
	console.log('url-->', req.url)
	await client.set('R', req.params.number)
	console.log('R -->', req.params.number)
	res.send({ data: 'OK' })
})

guessgame.get('/api/:number', async (req, res) => {
	console.log('url-->', req.url)
	let guessnumber = req.params.number
	let storenumber=await client.get('R')
	if (guessnumber === 'favicon.ico')
		res.status(404).send('<div>404 Not Found</div>')
	else {
		if(guessnumber===storenumber)
			res.send({data:'Guess Right'})
		if(guessnumber<storenumber)
			res.send({data:'Smaller'})
		if(guessnumber>storenumber)
			res.send({data:'Bigger'})
	}
})

guessgame.get('/:number', async (req, res) => {
	console.log('url-->', req.url)
	let guessnumber = req.params.number
	if (guessnumber === 'favicon.ico')
		res.status(404).send('<div>404 Not Found</div>')
	else {
		const R = await client.get('R')
		res.send({ data: await compare(guessnumber, R) })
	}
})

guessgame.listen(port, () => {
	console.log('server-start  port-->' + port)
})

function init() {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
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
	} else if (a == b) {
		await setstorenum()
		return 'Guess Right'
	}
}

