import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CustomerRegister from './CustomerRegister';
import CustomerWelcome from './CustomerWelcome';
import Dashboard from './Dashboard';



const appRoutes =
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path="/welcome" element={<CustomerWelcome/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      {/* <Route path='/dashboard' element={ <Security component={<Dashboard/>} /> }/>
      <Route path='/settings' element={ <Security component={<Settings/>} /> }/> */} 

    </Routes>
  </BrowserRouter>

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  appRoutes
);