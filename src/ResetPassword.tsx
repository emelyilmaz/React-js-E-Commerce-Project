import React, { useState } from 'react'
import { resetPassword } from './Services'
import { useSearchParams  } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { ICustomerRegister } from './models/ICustomerRegister';

function ResetPassword() {

  const [ResetError, setresetError] = useState(false)
  const [ResetMessageError, setResetMessageError] = useState('')
  const [confirmPassword,setconfirmPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  let [searchParams, setSearchParams] = useSearchParams();
  const token=searchParams.get('resettoken')


  const navigate=useNavigate()

const fncSend=(evt:React.FormEvent)=>{
  evt.preventDefault()
  if(confirmPassword ===newPassword){
   
    if(token!=null){
      console.log(newPassword)
    resetPassword(token,newPassword).then(res=>{
     
      const status=res.data.status
      if(status===true){
       
        setresetError(false)
        alert("Password was changed.You are redirected to the login page.")
        setTimeout(() => {
          navigate('/')
        }, 1500);
      }
     

    }).catch(error=>{
      const err = error as AxiosError
      
      if (err.response) {
        setresetError(true)
        const stResult=JSON.stringify(err.response?.data)
        
        const errorObject:ICustomerRegister =JSON.parse(stResult)
        const errors=errorObject.error!
        const messageError=errorObject.message
       
        if(errors!=null){
        const passworderror =(errors[0].password)
        setResetMessageError(passworderror!)
     

      }
      if(messageError!=null){
             
        setResetMessageError(messageError!)
      }
             

      }

    });
    }
  }else{
    setresetError(true)
    setResetMessageError("Password does not match.Please check  password you entered ")
   
  }

}



  return (

   
    <div className='mt-3'>
    
  <div className='row'>
    
    <h1 className='text-center'> Password Reset</h1>
   
  
 
 
  <div className='col-sm-4'> </div >

  <div className='col-sm-4' >
    <div className='mt-4'>
    <p >  <i  style={{fontSize:"22px",color:'darkorange'}} className="bi bi-exclamation-circle-fill" ></i> Password must be at least 6 characters long and must contain:   </p>
  <li > min one upper letter   </li>
  <li > min one lower letter   </li>
  <li > 0-9 digit number   </li>
    </div>
  
  <div style={{ display: ResetError === true ? 'block' : 'none'  }} className="alert alert-danger alert-dismissible fade show" role="alert">
          
          <strong>Error!</strong> { ResetMessageError }
          <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setresetError(false)} > </button> 

        </div>
 <form onSubmit={fncSend}>
 <div className='mt-3'>
  <input onChange={(evt)=>setnewPassword(evt.target.value)} className='form-control' type='password' placeholder='New Password'/>
  </div>
  <div className='mt-3'>
  <input onChange={(evt)=>setconfirmPassword(evt.target.value)} className='form-control' type='password' placeholder='Confirm Password'/>
  </div>
  <br></br>
  <div className="d-grid gap-2">
   <button style={{fontSize:"21px"}} className='btn btn-primary' type='submit'>Submit </button>
  </div>
  <div>

  </div>
  </form>
</div>
  <div className='col-sm-4'></div>
   </div>
   </div>

  )
}

export default ResetPassword