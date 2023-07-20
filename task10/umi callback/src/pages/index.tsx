import React from 'react'
import { Row, Button } from 'antd'
import request from 'request'

const port = 'localhost:3000'
const App: React.FC = () => {
	function find() {

		return search(0)

	}
	function search(i: number) {
		return request({
			method: 'GET',
			url: `http://${port}/${i}`,
			json: true,
		}, (error: any, response: request.Response, body: any) => {
			if (error) console.log(error)
			if (body.data === 'Guess Right') return console.log('i-->', i)
			i++
			if (i <= 1000000)
				search(i)


		})
	}


	return (
		<>
			<Row justify="center"><Button type="primary" onClick={find}>find</Button></Row>
		</>
	)
}

export default App