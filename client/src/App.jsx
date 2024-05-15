import react, {useState, useEffect, useContext} from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from './DB/AuthContext';

import Navbar from "/src/components/Navbar.jsx";
import Home from "./pages/Home.jsx"
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Mainpage from './pages/Mainpage.jsx'
import CreatePlan from './pages/CreatePlan';
import PlanView from './pages/Planview';
import EditPlan from './pages/editplan';
import Setting from './pages/Setting';

function App() {
  const {currentUser} = useContext(AuthContext)

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }else {return children;}
  }

  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/'>
          <Route index element={<Home/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='mainpage' element={
            <ProtectedRoute>
              <Mainpage/>
            </ProtectedRoute>}
          />
          <Route path='createPlan' element={
            <ProtectedRoute>
              <CreatePlan/>
            </ProtectedRoute>}
          />
          <Route path='setting' element={
            <ProtectedRoute>
              <Setting/>
            </ProtectedRoute>}
          />
          <Route path='plan/:id' element={
            <ProtectedRoute>
              <PlanView/>
            </ProtectedRoute>}
          />
          <Route path='editplan/:id' element={
            <ProtectedRoute>
              <EditPlan/>
            </ProtectedRoute>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
