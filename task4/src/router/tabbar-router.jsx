import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Tabbar from './tabbar'
export default function Tabbarrouter () {
	return (
		<HashRouter>
			<Switch>
				<Route path='/' component={Tabbar} />
			</Switch>
		</HashRouter>
	)

}