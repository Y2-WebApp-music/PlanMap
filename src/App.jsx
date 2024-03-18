import { useState } from 'react';
import AuthProvider from './AuthContext';

import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Mainpage from './pages/Mainpage.jsx'
import CreatePlan from './pages/CreatePlan';

function App() {

  return (
    <>
    <AuthProvider>
      {/* <Home /> */}
      {/* <Register /> */}
      {/* <Login /> */}
      {/* <Mainpage /> */}
      <CreatePlan />
    </AuthProvider>
    </>
  )
}

export default App
