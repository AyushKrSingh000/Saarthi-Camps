import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import MedForm from './pages/MedForm';
import RefugeeForm from './pages/RefugeeForm'
import Details from './pages/Details';
import Navbar from './components/Navbar';
import ManageDEO from './pages/ManageDEO';
import ForgotPassword from './pages/ForgotPwd';

import AuthContext from './components/AuthProvider';
import React, {useContext} from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <BrowserRouter>
      <div className="app-container">
        <Routes>
          {!authCtx.isLoggedIn && <Route index path='/' element={<Login />} />}
          {!authCtx.isLoggedIn && <Route index path='forgot-password' element={<ForgotPassword />} />}
          {!authCtx.isLoggedIn && <Route index path='*' element={<Login />} />}
          {authCtx.isLoggedIn && <Route path='/*' element={<AppWithSidebar />} />}
          {/* <Route index path='/' element={<Login />} /> */}
          {/* <Route path='/*' element={<AppWithSidebar />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

function AppWithSidebar() {
  return (
    <div className='w-[100vw]'>
      {/*  md:flex */}
      <Navbar/>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/add-refugee' element={<RefugeeForm />} />
        <Route path='/add-medicine' element={<MedForm />} />
        <Route path='/view-details' element={<Details />} />
        <Route path='/manage' element={<ManageDEO />}></Route>
      </Routes>
    </div>
  );
}

export default App
