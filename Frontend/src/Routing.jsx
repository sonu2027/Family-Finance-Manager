import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login.jsx'
import Register from './page/Register.jsx'
import VerifyEmail from './page/VerifyEmail.jsx'

function Routing() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/verifyemail' element={<VerifyEmail />} />
        </Routes>
    )
}

export default Routing