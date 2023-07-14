const should = require('should')
const axios = require('axios')

async function getobj(path) {
	let res = await axios.get(`http://localhost:3000${path}`)
	console.log(res.data)
	return res.data

}


describe('api-test', function () {
	it('respond with data OK', async () => {
		let obj = await getobj('/restart')
		return obj.should.eql({ data: 'OK' })
	})

	it('respond with data Smaller', async () => {
		let obj = await getobj('/36')
		return obj.should.eql({ data: 'Smaller' })
	})

	it('respond with data Bigger', async () => {
		let obj = await getobj('/38')
		return obj.should.eql({ data: 'Bigger' })
	})

	it('respond with data Guess Right', async () => {
		let obj = await getobj('/37')
		return obj.should.eql({ data: 'Guess Right' })
	})

})



/*  result

PS D:\task\task9> npm test

> aa@1.0.0 test
> mocha



  api-test
	✔ respond with data OK
	✔ respond with data Smaller
	✔ respond with data Bigger
	✔ respond with data Guess Right


  4 passing (32ms)

*/