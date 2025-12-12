import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/homepage'
import Aboutpage from './pages/aboutpage'
import Header from './components/common/header'
import Footer from './components/common/footer'
import Profilepage from './pages/profilepage'
import './App.css'

function App() {

  return (
      <div className='flex flex-col min-h-screen '>
        <Header />
        <main className="flex-1 container mx-auto px-2 py-6">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<Aboutpage />} />
            <Route path='/profile' element={<Profilepage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App
