import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './Components/login'
import NotFoundPage from './Components/notFound'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import './App.css'

const LoginOrChatPage = () => {
  return (
    (localStorage.getItem('token') === undefined) ? <Navigate to="/login"/> : <Navigate to="/login"/>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginOrChatPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
