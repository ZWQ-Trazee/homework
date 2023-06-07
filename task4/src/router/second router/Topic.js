import React,{useEffect} from 'react'
import App1 from './third router/app1'
import store from '../redux/redux'
import Game25 from './third router/game25'
import Game50 from './third router/game50'
import Game75 from './third router/game75'
import { NavLink,Route } from 'react-router-dom/cjs/react-router-dom'
export default function Topic() {
  const obj={width:'400px',float:'left',height:'200px'} 
  const obj1={border:'2px solid' ,float:'left',height: '400px',color:'dimgray'}

  useEffect(() => {
        store.dispatch({
            type: 'init'
      })
      console.log('开始')
      return () => {
        console.log('结束')
      }
      
      
    }, [])

  return (
    <>
    <div style={obj}><h2>Topic</h2>
    <ul>
        <li><NavLink to='/topic/25'   >25</NavLink></li>
        <li><NavLink to='/topic/50'   >50</NavLink></li>
        <li><NavLink to='/topic/75'   >75</NavLink></li>
    </ul>
    <App1></App1>
    </div>
    <div style={obj1}></div>  
    <Route path='/topic/25' component={Game25} ></Route>
    <Route path='/topic/50' component={Game50} ></Route>
    <Route path='/topic/75' component={Game75} ></Route> 
    </>
  )
}
