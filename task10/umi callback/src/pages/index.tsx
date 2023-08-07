import React from 'react'
import { Row, Button } from 'antd'
import request from 'request'

const App: React.FC = () => {
	const port = 'localhost:3000'
	function search(max: number, min: number, cb: { (num: number): void}) {
		const i = (max + min) / 2
		return request({
			method: 'GET',
			url: `http://${port}/${i}`,
			json: true,
		}, (error: unknown, response: request.Response, body: unknown) => {
			if (error) console.log(error)
			if (body.data === 'Guess Right') return cb(i)
			else if (body.data === 'Bigger') {
				max = i
				return search(max, min, cb)
			}
			else if (body.data === 'Smaller') {
				min = i
				return search(max, min, cb)
			}

		})
	}
	function find() {
		return search(1000000, 0, (num) => {
			console.log(num)
		})
	}

	return (
		<>
			<Row justify="center"><Button type="primary" onClick={find}>find</Button></Row>
		</>
	)
}

export default App