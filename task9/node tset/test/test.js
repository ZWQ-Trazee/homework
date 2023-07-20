const should = require('should')
const axios = require('axios')

async function getobj(path) {
	let res = await axios.get(`http://localhost:3000${path}`)
	console.log(res.data)
	return res.data
}

function init() {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	console.log('numb-->',numb)
	return numb
}

const i=init()

describe('api-test', function () {
	it('respond with data `OK`', async () => {
		let obj = await getobj(`/restart`)
		return obj.should.eql({ data: 'OK' })
	})

	it('respond with data `Smaller`', async () => {
		let obj = await getobj(`/49`)
		return obj.should.eql({ data: 'Smaller' })
	})
	it('respond with data `Bigger`', async () => {
		let obj = await getobj(`/51`)
		return obj.should.eql({ data: 'Bigger' })
	})
	it('respond with data `Guess Right`', async () => {
		let obj = await getobj(`/50`)
		return obj.should.eql({ data: 'Guess Right' })
	})

	it('respond with data `ready`', async () => {
		let obj = await getobj(`/restart/${i}`)
		return obj.should.eql({ data: 'ready' })
	})

	it('respond with data `Smaller`', async () => {
		let obj = await getobj(`/${i - 1}`)
		return obj.should.eql({ data: 'Smaller' })
	})
	it('respond with data `Bigger`', async () => {
		let obj = await getobj(`/${i + 1}`)
		return obj.should.eql({ data: 'Bigger' })
	})
	it('respond with data `Guess Right`', async () => {
		let obj = await getobj(`/${i}`)
		return obj.should.eql({ data: 'Guess Right' })
	})
})



