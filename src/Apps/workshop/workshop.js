import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header } from './Components';
import { Home, About, Currency } from './Views';

export const Workshop = () => {
  return (
    <div className='Container'>
        <BrowserRouter>
          <Header />
          <div className='page'>
            <Routes>
              <Route exact path='/' element={<Home />}>
              </Route>
              <Route path='/about' element={<About />}>
              </Route>
              <Route path='/currency/:code' element={<Currency />}>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>

        <Footer />
    </div>
  )
}