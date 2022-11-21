import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Allhomes from './Components/Allhomes';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Allhomes />} />
          <Route path='/allhomes' element={<Allhomes />} />
          <Route path='/viewhome' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
