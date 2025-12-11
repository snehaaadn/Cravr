import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import Aboutpage from './pages/aboutpage'
import Header from './components/common/header'
import Footer from './components/common/footer'
import './App.css'

function App() {

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/about" element={<Aboutpage />} />
      </Routes>      
    <Footer />
    </>
  )
}

export default App
