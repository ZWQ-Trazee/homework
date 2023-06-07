import React, { Component } from 'react'
import store from '../../redux/redux'
export default class Game25 extends Component{  
    myref=React.createRef()  
    state={randomnumber:store.getState().num,output:''}

    componentDidMount(){
        store.subscribe(()=>{
            console.log(store.getState().num)
            this.setState.randomnumber=store.getState().num
        })
    }

    render(){
    var obj={width:'300px',float:'left',height:'200px'} 
    this.compare(50,this.setState.randomnumber)
    return (
    <>  
        <div style={obj}><h2>{this.setState.output}</h2></div> 
    </>
    )
}

    compare(a,b){   
        if(a>b)
        {
            this.setState.output='大了'
        }
        else if(a<b)
        {
            this.setState.output='小了'
        }
        else if(a===b)
        {
            this.setState.output='恭喜你猜对了'
        }
    }
}