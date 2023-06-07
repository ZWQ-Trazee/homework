import React, { Component } from 'react'
import store from '../../redux/redux'
export default class App1 extends Component{  
    myref=React.createRef() 
    state={randomnumber:store.getState().num,
    inputlang:'请输入数字',cbuttonlang:'比较',rbuttonlang:'重置',output:''}
   
    componentDidMount(){
        store.subscribe(()=>{
            console.log(store.getState().num)
            this.setState.randomnumber=store.getState().num
        })
    }

    render(){
    const obj={backgroundColor:'blue', color:'white'}
    return (
    <>
    <div>
    {this.state.inputlang}<input ref={this.myref}></input>
    <button style={obj} onClick={()=>{
        this.compare(Number(this.myref.current.value),this.setState.randomnumber) }}>{this.state.cbuttonlang}</button>   
    <button style={obj} onClick={()=>store.dispatch({
            type: 'init'
      })}>{this.state.rbuttonlang}</button>
        
    </div>
    </>
   )
    }
    compare(a,b)
    {  
        if(a>b)
        {
            this.setState.output='大了' 
            alert(this.setState.output)
        }
        else if(a<b)
        {
            this.setState.output='小了'
            alert(this.setState.output)       
        }
        else if(a===b)
        {
            this.setState.output='猜对了'
            alert(this.setState.output)
    }
    }
}


