import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import EditEtudiants from './pages/EditEtudiants'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/edit/:id' element={<EditEtudiants />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
