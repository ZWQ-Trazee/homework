import React, { Component } from 'react'
const initState = {guessnum:'',inputnum:'',output:''} 
export default class App1 extends Component{   
    state = {
        ...initState,
        guessnum: this.init()
    }
    render(){
    const obj={backgroundColor:'blue', color:'white'}

    return (
    <>请输入一个数字
    <input onChange={(e)=>{
        console.log(this.state)
        this.setState({
            ...this.state,
            inputnum: Number(e.target.value) 
        })
        console.log(this.state.inputnum)}}></input>
    <button style={obj} onClick={()=>{
        this.compare(this.state.inputnum,this.state.guessnum)}}>比对</button>
    <button style={obj} onClick={()=>{
        this.setState({
            ...initState,
            guessnum: this.init()
        })
    }}>重置</button>
    <input type='text' name="result" disabled="disabled" value={this.state.output} />
    </>
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
            this.setState({
                ...this.state,
                output: '大了'
            })
            console.log(this.state.output)
        }
        else if(a<b)
        {
            this.setState({
                ...this.state,
                output: '小了'
            })
            console.log(this.state.output)
        }
        else if(a===b)
        {
            this.setState({
                ...this.state,
                output: '猜对了'
            })
            console.log(this.state.output)
        }
    }
}
