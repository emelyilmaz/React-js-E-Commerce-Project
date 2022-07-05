import React from 'react';
import ReactDOM from 'react-dom/client';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import CustomerRegister from './CustomerRegister';
import CustomerWelcome from './CustomerWelcome';
import Dashboard from './Dashboard';
import ResetPassword from './ResetPassword';
import ForgotPassword from './ForgotPassword';


import ChangePassword from './ChangePassword';
import ChangeProfile from './ChangeProfile';
import Security from './Security';
import OldOrder from './OldOrder';
import Basket from './Basket';



const appRoutes =
  <BrowserRouter>
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/customer/register" element={<CustomerRegister />} />
      <Route path="/welcome" element={<Security componet={<CustomerWelcome />}/>} />
      <Route path="/changepassword" element={<Security componet={<ChangePassword/>}/>} />
      <Route path="/changeprofile" element={<Security componet={<ChangeProfile/>}/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/resetPassword" element={<ResetPassword/>} />
      <Route path="/forgotpassword" element={<ForgotPassword/>} />
      <Route path="/oldOrder" element={<Security componet={<OldOrder/>} /> } />
      <Route path="/myChart" element={<Security componet={<Basket/>} /> } />
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