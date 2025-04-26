import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import EditEtudiants from './pages/EditEtudiants'
import AddStudent from './pages/AddStudent'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/edit/:id' element={<EditEtudiants />}></Route>
        <Route path='/add' element={<AddStudent />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
