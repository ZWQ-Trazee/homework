import React from 'react'
import { Row, Button } from 'antd'
import requestPromise from 'request-promise'
const port = 'localhost:3000'
const App: React.FC = () => {
	function search(i: number) {
		return requestPromise({
			uri: `http://${port}/${i}`,
			json: true
		})
			.then(res => res.data)
			.then(res => {
				if (res === 'Guess Right') {
					return console.log('i-->', i)
				}
				i++
				if (i <= 1000000)
					search(i)
			})
			.catch(err => console.log(err))
	}

	function find() {

		return search(0)

	}
	return (
		<>
			<Row justify="center"><Button type="primary" onClick={find}>find</Button>  </Row>
		</>
	)
}
export default App