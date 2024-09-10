import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Home'
import Register from './Register'
import Login from './Login'
import About from './About'





function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element= { <Login />}></Route>
        <Route path='/register' element ={ <Register />}></Route>
        <Route path='/home' element= { <Home />}></Route>
        <Route path='/About' element= { <About />}></Route>

        
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
