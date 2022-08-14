import './landingPage.css'
import { Navbar } from './components/Navbar'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { About } from './components/About'
import { Home } from './components/Home'

const navbarItems = [
    {url: "/", title:"Home"},
    {url: "/contact", title:"Contact"},
    {url: "/about", title:"About"}
]


export const LandingPage = () => {

    return (
        <div>  
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
                </Routes>
            </BrowserRouter>
        </div>
    )
}