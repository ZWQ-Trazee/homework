import {createStore} from 'redux'

const reducer=(prevState={num:0},action)=>{
	const newstate={...prevState}
	switch(action.type){
	case'init' :  newstate.num=init()
		return newstate
	default: return init()
	}
}
function init(){
	let numb = Math.random()
	numb = Math.ceil(numb * 100)
	console.log(numb)
	return numb
}
const store=createStore(reducer)
export default store