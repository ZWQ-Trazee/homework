import { useState } from "react"
export default function App1 (){
    const [guessnum,setGuessnum]=useState(init())
    const [inputnum,setInputnum]=useState(0)
    const [output,setOutput]=useState('Not compared')
    const obj={backgroundColor:'blue', color:'white'}
    return (
    <>Please enter a number
    <input onChange={(e)=>{
        setInputnum(Number(e.target.value))}}></input>
    <button style={obj} onClick={()=>{
        compare(inputnum,guessnum)}}>compare</button>
    <button style={obj} onClick={()=>{
        setGuessnum(init())}}>reset</button>
    <input type='text' name="result" disabled="disabled" value={output} />
    </>
    )

    function init(){
    let numb = Math.random()
    numb = Math.ceil(numb * 100)
    numb=(Number(numb))
    console.log(numb)
    return numb
    }

    function compare(a,b){   
        if(a>b)
        {
            setOutput('Bigger')
        }
        else if(a<b)
        {
            setOutput('Smaller')
        }
        else if(a===b)
        {
            setOutput('Guess right')
        }
    }
}
