import { ReactChild } from 'react'
import React from 'react'
import { Redirect } from 'umi'
import Parse from 'parse'
// eslint-disable-next-line react/display-name
export default (props: { children: ReactChild }) => {
	const User = Parse.User
	const isLogin = User.current()
	if (isLogin) {
		console.log('login sucessfully')
		return <div>{props.children}</div>
	} else {
		return <Redirect to="/" />
	}
}