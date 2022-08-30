import './landingPage.css'
import { Navbar } from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { About } from './components/About'
import { Home } from './components/Home'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { AuthProvider } from './context/AuthProvider'
import { Missing } from './components/Missing'
import { useCookies } from 'react-cookie'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import { Posts } from './components/Posts'
import { NewPost } from './components/NewPost'
import { Post } from './components/Post'

const navbarItems = [
    {url: "/", title:"Home"},
    {url: "/posts", title:"Posts"},
    {url: "/contact", title:"Contact"},
    {url: "/about", title:"About"}
]

export const LandingPage = () => {
    const {auth, setAuth} = useAuth()
    const [cookies] = useCookies()

    const readCookies = () => {
        let user = cookies.user
        if(user)
            setAuth({user})
    }
    
    useEffect(()=>{
        readCookies()
    },[])

    return (
        <div>
                <BrowserRouter >              
                    <Navbar navbarItems={navbarItems}/>
                        <Routes>
                            <Route path="/" element={
                                <Home />
                            } />
                            <Route path="/posts" element={
                                <Posts />
                            } />
                            <Route path="/post/:id" element={
                                <Post />
                            } />
                            <Route path="/about" element={
                                <About />
                            } />
                            <Route path="/contact" element={
                                <>
                                <p>Contact</p> 
                                </>
                            } />
                            <Route path="/register" element={
                                <Register />
                            } />
                            <Route path="/login" element={
                                <Login />
                            } />
                            <Route path="/newpost" element={
                                <NewPost />
                            } />
                            <Route path="*" element={
                                <Missing />                           
                            } />
                        </Routes>
                </BrowserRouter> 
        </div>
    )
}