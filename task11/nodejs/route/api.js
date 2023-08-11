const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const usermodel = mongoose.model('user', new mongoose.Schema({ username: String, password: String }))
const numbermodel = mongoose.model('number', new mongoose.Schema({ userid: String, storenum: Number }))

function init() {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	return numb
}

mongoose.connect('mongodb://admin:123456@127.0.0.1:27017/Trazee_project')

router.post('/register', async (req, res) => {
	const { username, password } = req.body
	console.log('username-->', username, 'password-->', password)
	const userobj = await usermodel.exists({ username: username })
	console.log('register-userobj-->', userobj)
	if (userobj === null) {
		await usermodel.create({ username, password })
		res.send({ data: '注册成功' })
	}
	else
		res.send({ data: '该用户已存在' })
})

router.post('/login', async (req, res) => {
	const { username, password } = req.body
	const userobj = await usermodel.exists({ username: username, password: password })
	console.log('login-userobj-->', userobj)
	if (userobj) {
		const userid = userobj._id
		const numberobj = await numbermodel.exists({ userid: userid })
		if (numberobj === null)
			await numbermodel.create({ userid })
		req.session.myid = userid
		console.log('req.session.myid-->', req.session.myid)
		res.send({ data: `hello,${username}` })
	}
	else res.send({ data: '该用户不存在或密码错误' })
})

router.get('/start', async (req, res) => {
	const storenum =  init()
	console.log('storenum-->', storenum)
	const numberobj = await numbermodel.exists({ userid: req.session.myid })
	console.log('start-numberobj-->', numberobj)
	if (numberobj === null) {
		await numbermodel.create({ userid: req.session.myid, storenum: storenum })
		res.send({ data: 'OK' })
	}
	else {
		await numbermodel.updateOne({ userid: req.session.myid }, { storenum: storenum })
		res.send({ data: 'OK' })
	}
})

router.get('/test/start/:number', async (req, res) => {
	const storenum =  Number(req.params.number)
	console.log('storenum-->', storenum)
	const numberobj = await numbermodel.exists({ userid: req.session.myid })
	console.log('start-numberobj-->', numberobj)
	if (numberobj === null) {
		await numbermodel.create({ userid: req.session.myid, storenum: storenum })
		res.send({ data: 'test OK' })
	}
	else {
		await numbermodel.updateOne({ userid: req.session.myid }, { storenum: storenum })
		res.send({ data: 'test OK' })
	}
})

router.get('/api/:number', async (req, res) => {
	const guessnum = Number(req.params.number)
	console.log('guessnum-->', req.params.number)
	const getstorenum = await numbermodel.findOne({ userid: req.session.myid }, 'storenum')
	let storenum = getstorenum.storenum
	console.log('storenum-->', storenum)
	if (guessnum > storenum)
		res.send({ data: 'big' })
	if (guessnum < storenum)
		res.send({ data: 'small' })
	if (guessnum === storenum) {
		storenum = init()
		await numbermodel.updateOne({ userid: req.session.myid }, { storenum: storenum })
		console.log('newstorenum-->', storenum)
		res.send({ data: 'equal' })
	}
})


module.exports = router