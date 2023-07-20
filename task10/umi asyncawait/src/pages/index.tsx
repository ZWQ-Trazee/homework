import React from 'react'
import { Row, Button } from 'antd'
import requestPromise from 'request-promise'
const port = 'localhost:3000'
const App: React.FC = () => {

	function find() {
		return search(0)
	}

	async function search(i: number) {
		const res = await requestPromise({
			uri: `http://${port}/${i}`,
			json: true
		})
		if (res.data === 'Guess Right')
			return console.log('i-->', i)
		i++
		if (i <= 1000000)
			search(i)
	}
	return (
		<>
			<Row justify="center"><Button type="primary" onClick={find}>find</Button></Row>
		</>
	)
}
export default App