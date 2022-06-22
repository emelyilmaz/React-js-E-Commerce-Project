import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ILogin } from './models/ILogin';
import { userLogin } from './Services';


function Login() {


  const navigate=useNavigate()

 
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [loginError,setLoginError]=useState(false)
const [loginMessage, setloginMessage] =useState('')



const  fncSend= (evt:React.FormEvent) => {
  evt.preventDefault()
 
 
    userLogin(email,password).then(res=>{
      const status=res.data.status
    
      if(status){
        const jwt=res.data.jwt
        const result=res.data.result!
        const roles=result.roles!
        const roleId=roles[0].id
        const stResult=JSON.stringify(result)
        const stJwt=JSON.stringify(jwt)
        sessionStorage.setItem("result",stResult)
        sessionStorage.setItem("jwt",stJwt)
        setLoginError(false)
         if(roleId===1){
            navigate('/dashboard')
         }else{
            navigate('/welcome')
         }
      }//else{
       // console.log ("aaa")
        //const message=res.data.message ||''
       // setloginMessage(message)
        //setLoginError(true)
     // }
     }).catch(error=>{
    
      const err = error as AxiosError
   
      if (err.response) {
        const stResult=JSON.stringify(err.response?.data)
        const errorObject:ILogin =JSON.parse(stResult)
        const messageError=errorObject.message
        setloginMessage(messageError!)
        setLoginError(true)
    }
});

  }



  return (
   <>
    <div className='row'>
     <div className='col-sm-4'></div>
     <div className='col-sm-4'><h1 className='text-center'>User Login</h1>
     <div style={{ display: loginError === true ? 'block' : 'none'  }} className="alert alert-danger alert-dismissible fade show" role="alert">
              
              <strong>Error!</strong> { loginMessage }
              <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setLoginError(false)} > </button> 

            </div>
     <form onSubmit={fncSend}>
      <div className='mt-3'>
      <input onChange={(evt)=>setEmail(evt.target.value)}  type='email' className='form-control' placeholder='E-Mail'/>
      </div>
      <div className='mt-3'>
      <input onChange={(evt)=>setPassword(evt.target.value)} className='form-control' type='password' placeholder='Password'/>
      </div>
      <div className='mt-3'>
       <button  className='btn btn-success' type='submit'>Log-in</button>
       <a onClick={(evt)=>navigate('customer/register')} role='button' className='btn btn-danger'>Register</a>
      </div>
      
     </form>
     </div>
     <div className='col-sm-4'></div>
   </div>
   
   </>
  )
}

export default Login;