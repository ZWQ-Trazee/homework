import React from 'react'
import ReactDOM  from 'react-dom'

ReactDOM.render
(
    <div>请输入数字<input type='text' id='unique' ></input><Comparebutton></Comparebutton><Initbutton></Initbutton></div>,document.getElementById('root')
)
var randomnum
function Initbutton()
{   
    var obj={backgroundColor:'blue', color:'white'}
    function init()
    {
    var number = Math.random()
    number = Math.ceil(number * 100)
    randomnum=(Number(number))
    console.log(randomnum)
    }
    return (<button style={obj} onClick={init}>重置</button>)
}

function Comparebutton()
{   
    var obj={backgroundColor:'blue', color:'white'}
    function compare()
    {   
        var Byid
        var inputnum
        Byid=document.getElementById('unique')
        inputnum=Number(Byid.value)
        if(inputnum>randomnum)
        {
            alert('大了')
        }
        else if(inputnum<randomnum)
        {
            alert('小了')
        }
        else if(inputnum===randomnum)
        {
            alert('猜对了')
        }
    }
    return (<button style={obj} onClick={compare}>对比</button>)
}

