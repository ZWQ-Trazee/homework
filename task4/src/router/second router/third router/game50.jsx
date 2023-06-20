import Game from './game'
export default class Game50 extends Game {

	componentDidMount () {
		// this.setState.guessnumber = this.props.match.params.id
		this.compare(50, this.state.randomnumber)

	}

}
