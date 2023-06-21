import React, { useEffect, useState } from 'react'
import store from '../redux/redux'
import Game25 from './third router/game25'
import Game50 from './third router/game50'
import Game75 from './third router/game75'
import { NavLink, Route, useHistory, Switch } from 'react-router-dom'
import App from './third router/app'
export default function Topic () {
	const obj = { width: '400px', float: 'left', height: '200px' }
	const obj1 = { border: '2px solid', float: 'left', height: '400px', color: 'dimgray' }
	const obj2 = { backgroundColor: 'blue', color: 'white' }

	const initstate = ''
	const [state, setState] = useState(initstate)

	let history = useHistory()

	useEffect(() => {
		store.dispatch({
			type: 'init'
		})
		console.log('开始')
		return () => {
			console.log('结束')
		}
	}, [])

	return (
		<>
			<div style={obj}><h2>Topic</h2>
				<ul>
					<li><NavLink to='/topic/25'>25</NavLink></li>
					<li><NavLink to='/topic/50'>50</NavLink></li>
					<li><NavLink to='/topic/75'>75</NavLink></li>
					<li>
						<input onChange={(e) => {
							console.log('e-->', e.target.value)
							setState(e.target.value)
						}} />
						<button style={obj2} onClick={() => {
							history.push(`/topic/${state}`)
						}}>
							比较
						</button>
						<button style={obj2} onClick={() => store.dispatch({ type: 'init' })}>
							重置</button>
					</li>
				</ul>
			</div>
			<div style={obj1}></div>
			<Switch>
				<Route path='/topic/25' component={Game25}></Route>
				<Route path='/topic/50' component={Game50}></Route>
				<Route path='/topic/75' component={Game75}></Route>
				<Route path='/topic/:id' >
					<App value={state} />
				</Route>
			</Switch>
		</>
	)
}
