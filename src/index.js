import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarSpacer from './components/NavbarSpacer';
import Landing from './routes/Landing';
import 'antd/dist/antd.css';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Navbar />
      <NavbarSpacer />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </React.StrictMode>
    ,
  </BrowserRouter>,
  document.getElementById('root')
);
