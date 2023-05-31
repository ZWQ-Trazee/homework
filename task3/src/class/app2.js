import React, { Component } from 'react'
export default class App1 extends Component{  
    myref=React.createRef()  
    state={randomnumber:'',
        inputlang:'Please enter a number',cbuttonlang:'Compare',rbuttonlang:'Reset',
        ifb:'Bigger',ifs:'Smaller',ifr:'Congratulations, you guessed it right'}
    render(){
    const obj={backgroundColor:'blue', color:'white'}
    return (
    <>{this.state.inputlang}<input ref={this.myref}></input>
    <button style={obj} onClick={()=>{
        this.compare(Number(this.myref.current.value),this.setState.randomnumber)}}>{this.state.cbuttonlang}</button>
    <button style={obj} onClick={()=>this.setState.randomnumber=this.init()}>{this.state.rbuttonlang}</button></>
    )
}

    init(){
    let numb = Math.random()
    numb = Math.ceil(numb * 100)
    numb=(Number(numb))
    console.log(numb)
    return numb
    }

    compare(a,b){   
        if(a>b)
        {
            alert(this.state.ifb)
        }
        else if(a<b)
        {
            alert(this.state.ifs)
        }
        else if(a===b)
        {
            alert(this.state.ifr)
        }
    }
}