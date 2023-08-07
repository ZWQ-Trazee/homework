const should = require('should')
const axios = require('axios')

const mongoose = require('mongoose')
const usermodel = mongoose.model('user', new mongoose.Schema({ username: String, password: String }))
const numbermodel = mongoose.model('number', new mongoose.Schema({ userid: String, storenum: Number }))

const username = 'username'
const password = 'password'
const errusername = 'errusername'
const errpassword = 'errpassword'
let cookie

function init() {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	console.log('numb-->', numb)
	return numb
}

const i = init()

describe('api-test', async function () {
	it('respond with data "注册成功"', async () => {
		let res = await axios.post('http://localhost:3000/register', {
			username: username,
			password: password
		})
		res = res.data
		return res.should.eql({ data: '注册成功' })
	})

	it('respond with data "该用户已存在"', async () => {
		let res = await axios.post('http://localhost:3000/register', {
			username: username,
			password: password
		})
		res = res.data
		return res.should.eql({ data: '该用户已存在' })
	})

	it('respond with data "该用户不存在或密码错误"', async () => {
		let res = await axios.post('http://localhost:3000/login', {
			username: errusername,
			password: password
		})
		res = res.data
		return res.should.eql({ data: '该用户不存在或密码错误' })
	})

	it('respond with data "该用户不存在或密码错误"', async () => {
		let res = await axios.post('http://localhost:3000/login', {
			username: username,
			password: errpassword
		})
		res = res.data
		return res.should.eql({ data: '该用户不存在或密码错误' })
	})

	it(`respond with data "hello,${username}"`, async () => {
		let res = await axios.post('http://localhost:3000/login', {
			username: username,
			password: password
		})
		cookie = res.headers['set-cookie'] //路由拦截
		res = res.data
		return res.should.eql({ data: `hello,${username}` })
	})

	it('respond with data "OK"', async () => {
		let res = await axios.get('http://localhost:3000/start', { headers: { 'cookie': cookie } })
		res = res.data
		return res.should.eql({ data: 'OK' })
	})

	it('respond with data "test OK"', async () => {
		let res = await axios.get(`http://localhost:3000/test/start/${i}`, { headers: { 'cookie': cookie } })
		res = res.data
		return res.should.eql({ data: 'test OK' })
	})

	it('respond with data "small"', async () => {
		let res = await axios.get(`http://localhost:3000/api/${i - 1}`, { headers: { 'cookie': cookie } })
		res = res.data
		return res.should.eql({ data: 'small' })

	})

	it('respond with data "big"', async () => {
		let res = await axios.get(`http://localhost:3000/api/${i + 1}`, { headers: { 'cookie': cookie } })
		res = res.data
		return res.should.eql({ data: 'big' })

	})

	it('respond with data "equal"', async () => {
		let res = await axios.get(`http://localhost:3000/api/${i}`, { headers: { 'cookie': cookie } })
		res = res.data
		return res.should.eql({ data: 'equal' })

	})

	before(async () => {
		await mongoose.connect('mongodb://admin:123456@127.0.0.1:27017/Trazee_project')
	})
	after(async () => {
		const getid=await usermodel.findOne({ username: username },'_id')
		console.log(getid)
		await numbermodel.deleteOne({ userid: getid._id })
		await usermodel.deleteOne({ username: username })
	})

})




