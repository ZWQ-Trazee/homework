// import Game from './game'
import React, { useEffect, useState } from 'react'
import store from '../../redux/redux'
// export default class App extends Game {

// 	componentDidMount () {
// 		// this.setState.guessnumber = this.props.match.params.id
// 		this.setState({ ...this.state, guessnumber: this.props.value })
// 		this.compare(Number(this.state.guessnumber), this.state.randomnumber)
// 		console.log('value --->', this.props)

// 	}

// 	// render () {
// 	// 	return (<div>{this.state.output}</div>)
// 	// }

// }

const App = (props) => {
	const [randomnumber, setRandomnumber] = useState(store.getState().num)
	useEffect(() => {
		store.subscribe(() => {
			console.log(store.getState().num)
			setRandomnumber(store.getState().num)
		})
	}, [])

	console.log('props -->', randomnumber)
	// eslint-disable-next-line react/prop-types
	return (<div> <h2>{props.value ? props.value > randomnumber ? '大了' : (props.value < randomnumber ? '小了' : '猜对了') : ''}</h2></div >)
}

export default App

