import React, { useEffect, useState } from 'react'
import store from '../../redux/redux'


const App = (props) => {
	const intlstate = { randomnumber: store.getState().num, output: '' }
	const [state, setState] = useState(intlstate)
	useEffect(() => {
		store.subscribe(() => {
			console.log(store.getState().num)
			setState({ ...state, randomnumber: store.getState().num })
		})

	}, [])
	useEffect(() => {
		if (Number(props.value) > state.randomnumber)
			setState({ ...state, output: '大了' })
		else if (Number(props.value) < state.randomnumber)
			setState({ ...state, output: '小了' })
		else setState({ ...state, output: '猜对了' })
	}, [props.value])

	console.log('props -->', props)
	return (
		<div><h2>{state.output}</h2></div >
	)
}

export default App