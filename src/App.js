import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TFT from './page/TFT.js';
import LOL from './page/LOL.js';
import VAL from './page/VAL.js';
import Loldetail from './page/Loldetail';
import Nav from './component/Nav';
import Nav2 from './component/Nav2';
import Footer from './component/Footer';

function App() {
  return (
    <BrowserRouter>
    <Nav/>
    <Nav2/>
    <Routes>
      <Route path='/' element={<LOL/>}/>
      <Route path='/tft' element={<TFT/>}/>
      <Route path='/val' element={<VAL/>}/>
      <Route path='/loldetail' element={<Loldetail/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
