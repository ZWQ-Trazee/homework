import React, { Component } from 'react'

const GlobalContext = React.createContext
export default class Appcontext extends Component {
	render () {
		return (
			<GlobalContext.Provider value={{ key:1,output_init:'未比较'}} >
				<div>
					<select onChange={(e) => {
						console.log('e -->', e.target.value)
					}}
					>
						<option value={1}>中文</option>
						<option value={2}>英文</option>
					</select>
				</div>
			</GlobalContext.Provider>
		)
	}
}
