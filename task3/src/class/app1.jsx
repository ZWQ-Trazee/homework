import React, { useState, useEffect } from 'react'

export default function App1() {
  const [guessnum, setGuessnum] = useState(0)
  const [inputnum, setInputnum] = useState(0)
  const [output, setOutput] = useState('未比较')
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
      setOutput('大了')
    } else if (a < b) {
      setOutput('小了')
    } else if (a === b) {
      setOutput('猜对了')
    }
  }

  useEffect(() => {
    setGuessnum(init())
  }, [])
  return (
    <>
      请输入一个数字
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
        对比

      </button>
      <button
        type="button"
        style={obj}
        onClick={() => {
          setGuessnum(init()); setOutput('')
        }}
      >
        重置

      </button>
      <input type="text" name="result" disabled="disabled" value={output} />
    </>
  )
}
