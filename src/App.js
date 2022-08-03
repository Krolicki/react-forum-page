import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Footer, Header, Content } from './Components';

function App() {
  return (
    <div className='Container'>

        <BrowserRouter>
          <Header />
          <Content text="Props text"/>

          <Routes>
            <Route exact path='/' element={<h1>Home Page</h1>}>
            </Route>
            <Route path='/about' element={<h1>About Page</h1>}>
            </Route>
          </Routes>
        </BrowserRouter>
        <Footer />
    </div>
  );
}

export default App;
