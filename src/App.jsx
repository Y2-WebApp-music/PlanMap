import { useState } from 'react';
import AuthProvider from './AuthContext';

import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Mainpage from './pages/Mainpage.jsx'

function App() {

  return (
    <>
    <AuthProvider>
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      <Mainpage />
    </AuthProvider>
    </>
  )
}

export default App
