import './landingPage.css'
import { Navbar, Home, Missing, Footer, RequireAuth } from './components'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { About, ChangePassword, Contact, EditPost, Login, NewPost, Post, Posts, Profile, Register } from './views'
import { useCookies } from 'react-cookie'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'

const navbarItems = [
    {url: "/", title:"Home"},
    {url: "/posts", title:"Posts"},
    {url: "/contact", title:"Contact"},
    {url: "/about", title:"About"}
]

export const LandingPage = () => {
    const { setAuth} = useAuth()
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
        <div className='landing-page-wraper'>
                <BrowserRouter >              
                    <Navbar navbarItems={navbarItems} />
                        <Routes>
                            <Route path="/" element={
                                <Home />
                            } />
                            <Route element={<RequireAuth />}>
                                <Route path="/posts" element={<Posts />} />
                                <Route path="/post/:id" element={<Post />} />
                                <Route path="/newpost" element={<NewPost />} />
                                <Route path="/editpost/:id" element={<EditPost />} />
                                <Route path="/changepassword" element={<ChangePassword />} />
                                <Route path="/profile/:username" element={<Profile />} />
                            </Route>
                            <Route path="/about" element={
                                <About />
                            } />
                            <Route path="/contact" element={
                                <Contact />
                            } />
                            <Route path="/register" element={
                                <Register />
                            } />
                            <Route path="/login" element={
                                <Login />
                            } />
                            <Route path="*" element={
                                <Missing />                           
                            } />
                        </Routes>
                    <Footer />
                </BrowserRouter> 
        </div>
    )
}