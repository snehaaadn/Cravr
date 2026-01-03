import React, { useState, useEffect} from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Homepage from './pages/homepage'
import Aboutpage from './pages/aboutpage'
import Header from './components/common/header'
import Footer from './components/common/footer'
import Profilepage from './pages/profilepage'
import AuthPage from './pages/authpage'
import Loading from './components/common/loading.jsx';
import SearchPage from './pages/searchpage';
import MenuPage from './pages/menupage';
import ProtectedRoute from './components/protectedRoutes.jsx'
import './App.css'


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 2000); 
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
      <div className='flex flex-col max-w-full min-h-screen '>
        {isLoading && <Loading />}
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/about' element={<Aboutpage />} />
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profilepage />
              </ProtectedRoute>
            } />
            <Route path='/login' element={<AuthPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/restaurant/:id' element={<MenuPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
}

export default App
