import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NavbarSpacer from './components/NavbarSpacer';
import { BrowserTracing } from '@sentry/tracing';

import Landing from './routes/Landing';
import 'antd/dist/antd.less';
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'https://a80eec3440c843c7b8dd09a2971a0e63@o1285239.ingest.sentry.io/6496370',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
});

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
