import React, { useEffect, useState } from 'react'
import { Result } from '../models/ILogin'
import { NavLink, useSearchParams } from 'react-router-dom'
import { isTemplateExpression } from 'typescript'
import CustomerWelcome from '../CustomerWelcome'
import { clear } from 'console'
/* 
interface ButtonProps {
  

  Search: () => void;
} */
function NavBarCustomer(item:{result:Result} /*item1:{Search:ButtonProps}*/) {
  const [search, setsearch] = useState('')

  const clear=()=>{
  sessionStorage.removeItem('result')
  sessionStorage.removeItem('data')
}


useEffect(() => {
  if(search.length>0){
  

  }
  }, [search])



return (
 



<nav style={{backgroundColor:"#1F4690"}}className="navbar navbar-expand-lg ">
<div className="container-fluid">
<NavLink to='/welcome' style={{color:'white',fontSize:22}} className="navbar-brand"> Home</NavLink>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
<span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul style={{color:'white'}} className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item">
      <NavLink to='/oldOrder' style={{color:'white',fontSize:17}}className="nav-link"> My Old Order</NavLink>
   
  </li>
  <li className="nav-item">
  <NavLink style={{color:'white',fontSize:17}} to='/myChart' className="nav-link"> My Order Chart</NavLink>
  </li>
  <li className="nav-item dropdown">
    <a style={{color:'white',fontSize:17}} className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
      Settings
    </a>
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><NavLink to='/changepassword' className="dropdown-item"> Change Password</NavLink></li>
      <li><NavLink to='/changeprofile' className="dropdown-item">Change Profile Information</NavLink> </li>
      
    </ul>
  </li>
 
</ul>
<form className="d-flex" role="search">
  <input onChange={(evt) =>  setsearch(evt.target.value)} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
  <button   style={{color:'white',borderColor:'white'}} className="btn btn-outline-success" type="submit">Search</button>
</form>
<ul  className="nav- left">
<li className="nav-item dropdown">
    <a  style={{color:'white',paddingTop:12}}  className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    <span  style={{borderRadius:6,paddingTop:4,paddingBottom:9,paddingLeft:10,paddingRight:10}}className="border border-white" > {item.result.firstName} {item.result.secondName} </span>
    </a>
    
    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
      <li><NavLink onClick={clear} to='/'className="nav-link"> Exit</NavLink></li>
    
     
      
    </ul>
  </li>
  </ul>




</div>
</div>
</nav>
)
}


export default NavBarCustomer 