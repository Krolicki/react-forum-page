import './landingPage.css'
import { Navbar } from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { About } from './components/About'
import { Home } from './components/Home'
import { Register } from './components/Register'
import { Login } from './components/Login'
import { Missing } from './components/Missing'
import { useCookies } from 'react-cookie'
import useAuth from './hooks/useAuth'
import { useEffect } from 'react'
import { Posts } from './components/Posts'
import { NewPost } from './components/NewPost'
import { Post } from './components/Post'
import { RequireAuth } from './components/RequireAuth'
import { EditPost } from './components/EditPost'
import { Footer } from './components/Footer'
import { Contact } from './components/Contact'
import { ChangePassword } from './components/ChangePassword'
import { Profile } from './components/Profile'

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
                                <Route path="/profile" element={<Profile />} />
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