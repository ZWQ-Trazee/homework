import React, { Component } from 'react'
import store from '../../redux/redux'
export default class Game extends Component {
    state = { randomnumber: store.getState().num, guessnumber: '', output: '' }

    componentDidMount () {
        store.subscribe(() => {
            console.log(store.getState().num)
            this.setState({ ...this.state, randomnumber: store.getState().num })
        })
    }

    render () {
        var obj = { width: '300px', float: 'left', height: '200px' }
        return (
            <>
                <div style={obj}><h2>{this.state.output}</h2></div>
            </>
        )
    }

    compare (a, b) {
        if (a > b) {
            this.setState({ ...this.state, output: '大了' })
        }
        else if (a < b) {
            this.setState({ ...this.state, output: '小了' })
        }
        else if (a === b) {
            this.setState({ ...this.state, output: '猜对了' })
        }
    }
}