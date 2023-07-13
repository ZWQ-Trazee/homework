import React, { useState } from 'react'
import { Col, Row, Typography, Input, Button } from 'antd'
const { TextArea } = Input
const { Title } = Typography

const port = 'localhost:3000'
const App: React.FC = () => {
	const [state, setstate] = useState<string>('')
	const [iptval, setiptval] = useState<string>('')

	async function restart(): Promise<void> {
		const res = await fetch('http://' + port + '/' + 'restart')
		const getdata = await res.json()
		await setstate(getdata.data)
		console.log(getdata.data)
	}

	async function submit(): Promise<void> {
		try {
			const res = await fetch('http://' + port + '/' + iptval)
			const getdata = await res.json()
			await setstate(getdata.data)
			console.log(getdata.data)
		} catch (err) {
			console.error(err)
		}
	}

	async function handleonchange(e: React.ChangeEvent<HTMLTextAreaElement>): Promise<void> {
		await setiptval(e.target.value)
		console.log('e.target.value -->', e.target.value)
	}

	return (
		<>
			<Row justify='center'><Title>Number Guesser</Title></Row>
			<TextArea onChange={(e) => handleonchange(e)} placeholder='Guess A Number' autoSize={{ minRows: 2, maxRows: 6 }} />
			<Row>
				<Col span={8}><Button type='primary' onClick={() => restart()}>Restart</Button></Col>
				<Col span={8}></Col>
				<Col span={8}><Button type='primary' onClick={() => submit()}>Submit</Button></Col>
			</Row>
			<Row justify={'center'}><Title type='secondary'>{state}</Title></Row>
		</>
	)
}

export default App