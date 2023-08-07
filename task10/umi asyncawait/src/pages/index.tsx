import React from 'react'
import { Row, Button } from 'antd'
import requestPromise from 'request-promise'
const port = 'localhost:3000'
const App: React.FC = () => {
	async function search(max: number, min: number) {
		const i = (max + min) / 2
		let res = await requestPromise({
			uri: `http://${port}/${i}`,
			json: true
		})
		res = res.data
		if (res === 'Guess Right') return i
		else if (res === 'Bigger') {
			max = i
			return search(max, min)
		}
		else if (res === 'Smaller') {
			min = i
			return search(max, min)
		}
	}

	async function find() {
		const number= await search(1000000, 0)
		console.log(number)
	}

	return (
		<>
			<Row justify="center"><Button type="primary" onClick={find}>find</Button></Row>
		</>
	)
}
export default App