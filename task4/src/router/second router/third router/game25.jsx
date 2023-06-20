import Game from './game'
export default class Game25 extends Game {

	componentDidMount () {
		// this.setState.guessnumber = this.props.match.params.id
		this.compare(25, this.state.randomnumber)

	}

}

