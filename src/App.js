import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header, Content } from './Components';
import { Home, About } from './Views';

function App() {
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
            </Routes>
          </div>
        </BrowserRouter>

        <Footer />
    </div>
  );
}

export default App;
