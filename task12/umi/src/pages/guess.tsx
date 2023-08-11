import React, { useState, useEffect } from 'react'
import { Col, Row, Typography, Input, Button } from 'antd'
import Parse from 'parse'

const { TextArea } = Input
const { Title } = Typography

const init = () => {
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	return numb
}

const App: React.FC = () => {

	useEffect(() => {
		window.addEventListener('beforeunload', () => {
			localStorage.clear()
		})
		return () => {
			window.removeEventListener('beforeunload', () => {
				localStorage.clear()
			})
		}
	}, [])

	const [state, setstate] = useState<string>('')
	const [iptval, setiptval] = useState<string>('')
	const Numberobj = Parse.Object.extend('Numberobj')
	const Query_numberobj = new Parse.Query(Numberobj)
	const user = Parse.User
	const current_userid = user.current()?.id

	async function start(): Promise<void> {
		Query_numberobj.equalTo('userid', current_userid)
		const numberobj = await Query_numberobj.first()
		const storenum = init()
		console.log('start-storenum-->', storenum)
		if (numberobj) {
			numberobj.set('storenum', storenum)
			await numberobj.save()
			console.log('reset OK')
		}
		else {
			const numberobj = new Numberobj()
			numberobj.set('userid', current_userid)
			numberobj.set('storenum', storenum)
			await numberobj.save()
			console.log('set OK')
		}
	}

	async function compare(): Promise<void> {
		Query_numberobj.equalTo('userid', current_userid)
		const numberobj = await Query_numberobj.first()
		let storenum = Number(numberobj?.attributes.storenum)
		const guessnum = Number(iptval)
		console.log('storenum', storenum)
		if (guessnum > storenum) setstate('大了')
		if (guessnum < storenum) setstate('小了')
		if (guessnum === storenum) {
			setstate('猜对了')
			storenum = init()
			console.log('compare-storenum-->', storenum)
			numberobj.set('storenum', storenum)
			await numberobj.save()
			console.log('compare--reset OK')
		}
	}

	return (
		<>
			<Row justify="center"><Title>Number Guesser</Title></Row>
			<TextArea onChange={(e) => setiptval(e.target.value)} placeholder="Guess A Number" autoSize={{ minRows: 2, maxRows: 6 }} />
			<Row>
				<Col span={8} offset={8}><Button type="primary" onClick={start}>start</Button></Col>
				<Col span={8} ><Button type="primary" onClick={compare}>compare</Button></Col>
			</Row>
			<Row justify="center"><Title type="secondary">{state}</Title></Row>
		</>
	)
}

export default App