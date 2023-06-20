import React, { useEffect, useState } from 'react'
import store from '../../redux/redux'


const App = (props) => {
	const [randomnumber, setRandomnumber] = useState(store.getState().num)
	useEffect(() => {
		store.subscribe(() => {
			console.log(store.getState().num)
			setRandomnumber(store.getState().num)
		})
	}, [])

	console.log('props -->', randomnumber)
	return (<div> <h2>{props.value ? props.value > randomnumber ? '大了' : (props.value < randomnumber ? '小了' : '猜对了') : ''}</h2></div >)
}

export default App