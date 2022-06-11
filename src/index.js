import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './routes/landing';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </React.StrictMode>
    ,
  </BrowserRouter>,
  document.getElementById('root')
);
