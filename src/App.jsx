import { useState } from 'react';
import AuthProvider from './AuthContext';

import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'

function App() {

  return (
    <>
    <AuthProvider>
      {/* <Home /> */}
      {/* <Register /> */}
      <Login />
    </AuthProvider>
    </>
  )
}

export default App
