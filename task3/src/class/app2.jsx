import React, { useState, useEffect } from 'react'

export default function App1() {
  const [guessnum, setGuessnum] = useState(0)
  const [inputnum, setInputnum] = useState(0)
  const [output, setOutput] = useState('not compared')
  const obj = { backgroundColor: 'blue', color: 'white' }

  function init() {
    let numb = Math.random()
    numb = Math.ceil(numb * 100)
    numb = (Number(numb))
    console.log(numb)
    return numb
  }

  function compare(a, b) {
    if (a > b) {
      setOutput('Bigger')
    } else if (a < b) {
      setOutput('Smaller')
    } else if (a === b) {
      setOutput('Guess right')
    }
  }

  useEffect(() => {
    setGuessnum(init())
  }, [])
  return (
    <>
      please enter a number
      <input onChange={(e) => {
        setInputnum(Number(e.target.value))
      }}
      />
      <button
        type="button"
        style={obj}
        onClick={() => {
          compare(inputnum, guessnum)
        }}
      >
        compare

      </button>
      <button
        type="button"
        style={obj}
        onClick={() => {
          setGuessnum(init()); setOutput('')
        }}
      >
        reset

      </button>
      <input type="text" name="result" disabled="disabled" value={output} />
    </>
  )
}
