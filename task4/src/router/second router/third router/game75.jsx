import Game from './game'
export default class Game75 extends Game {

	componentDidMount () {
		// this.setState.guessnumber = this.props.match.params.id
		this.compare(75, this.state.randomnumber)

	}

}