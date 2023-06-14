import React, { useState } from 'react'
import App1 from './app1'
import App2 from './app2'

export default function Langselect() {
  const [local, setLocal] = useState(1)

  return (
    <div>
      {local === 1 ? <App1 /> : <App2 />}
      <select onChange={(e) => {
        console.log('e -->', e.target.value)

        setLocal(Number(e.target.value))
      }}
      >
        <option value={1}>中文</option>
        <option value={2}>英文</option>
      </select>
    </div>
  )
}
