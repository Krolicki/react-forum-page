import './landingPage.css'
import { Navbar } from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { About } from './components/About'
import { Home } from './components/Home'
import { Register } from './components/Register'
import { Login } from './components/Login'
import AuthContext, { AuthProvider } from './context/AuthProvider'
import { useContext, useEffect } from 'react'

const navbarItems = [
    {url: "/", title:"Home"},
    {url: "/contact", title:"Contact"},
    {url: "/about", title:"About"}
]


export const LandingPage = () => {
    return (
        <div>
            <AuthProvider>
                <BrowserRouter >              
                    <Navbar navbarItems={navbarItems}/>
                        <Routes>
                            <Route path="/" element={
                                <Home />
                            } />
                            <Route path="/about" element={
                                <About />
                            } />
                            <Route path="/contact" element={
                                <>
                                <a>Contact</a> 
                                </>
                            } />
                            <Route path="/register" element={
                                <Register />
                            } />
                            <Route path="/login" element={
                                <Login />
                            } />
                        </Routes>
                </BrowserRouter>
            </AuthProvider>  
        </div>
    )
}