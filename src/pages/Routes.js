import React from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
// import Frontend from "./Frontend"
import Auth from "./Auth"
import Dashboard from "./Dashboard"
import Frontend from "./Frontend"
import { useAuthContext } from '../context/AuthContext'
import PrivateRoute from '../components/PrivateRoute'
import MenuMenagement from './MenuMenagement'

export default function Index() {
  const {isAuthenticated} = useAuthContext()
  
  return (
    <>

    <Routes>
        {/* <Route path="/*" element={!isAuthenticated  ? <Navigate to="/auth/login"/> : <Frontend/>}/> */}
        <Route path="/*" element={<Frontend/>}/>
        <Route path="menumenagement/*" element={!isAuthenticated  ? <Navigate to="/auth/login"/> : <MenuMenagement/>}/>
        <Route path="auth/*" element={ <Auth/> }/>
        {/* <Route path="dashboard/*" element={userData.role===seller?<Dashboard/>:}/> */}
        <Route path="dashboard/*" element={<PrivateRoute component={Dashboard} />}/>

      
    </Routes>
    </>
  )
}
