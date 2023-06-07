import React from 'react'
import {Route ,NavLink} from 'react-router-dom/cjs/react-router-dom'
import Home from './second router/Home'
import About from './second router/About'
import Topic from './second router/Topic'
export default function Tabbar() {

    var obj1={width:'400px',float:'left',height:'200px'}
    var obj2={border:'2px solid' ,float:'left',height: '400px',color:'dimgray'}
    return ( 
    <>
    <div style={obj1}>
        <ul>
            <li><NavLink to='/home'  >Home </NavLink></li>
            <li><NavLink to='/about' >About</NavLink></li>
            <li><NavLink to='/topic' >Topic</NavLink></li>
        </ul>   
    </div>
    <div style={obj2}></div> 
    <Route path='/home'  component={Home}  ></Route>
    <Route path='/about' component={About} ></Route>
    <Route path='/topic' component={Topic} ></Route> 
    </>
    )
}
