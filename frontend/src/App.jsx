import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import LoginPage from './Components/Login'
import ChatPage from './Components/PageWithChat'
import NotFoundPage from './Components/NotFound'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import './App.css'
import hasToken from '../src/utils/hasToken.js'

const LoginOrChatPage = () => {
  return (
    !hasToken() ? <Navigate to="login"/> : <ChatPage/>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginOrChatPage/>}/>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='chat' element={<ChatPage/>}/>
        <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
