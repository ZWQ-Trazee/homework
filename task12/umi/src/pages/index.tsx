import React, { useState } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Col, Row, Typography, Input, Button } from 'antd'
import Parse from 'parse'
const { Title } = Typography

Parse.initialize('myAppId')
Parse.serverURL = 'http://localhost:1337/parse'

const App: React.FC = () => {
	const [username, setusername] = useState('')
	const [password, setpassword] = useState('')

	async function register() {
		try {
			const user = new Parse.User
			user.set('username', username)
			user.set('password', password)
			await user.signUp()
			alert('register sucessfully')
		} catch (err) {
			alert('the username already exsits')
		}
	}

	async function login() {
		try {
			await Parse.User.logIn(username, password)
			location.href = 'http://localhost:8000/guess'
			console.log('login sucessfully')
		}
		catch (err) {
			alert('the user does not exist or the password is incorrect')
		}
	}


	return (
		<>
			<Row justify="center"><Title>Login Page</Title></Row>
			<Row>
				<Col span={8} offset={8}>
					<Input size="large" placeholder="enter username" prefix={<UserOutlined />} onChange={(e) => {
						setusername(e.target.value)
					}} />
				</Col>
			</Row>
			<Row>
				<Col span={8} offset={8}>
					<Input.Password placeholder="input password" onChange={(e) => {
						setpassword(e.target.value)
					}} />
				</Col>
			</Row>
			<Row>
				<Col span={4} offset={4}><Button type="primary" onClick={register}>register</Button></Col>
				<Col span={4} offset={8}><Button type="primary" onClick={login}>login</Button></Col>
			</Row>
		</>
	)
}

export default App