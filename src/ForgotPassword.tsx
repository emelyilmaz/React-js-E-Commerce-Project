import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { ILogin } from './models/ILogin'
import { forgotPassword } from './Services'

function ForgotPassword() {

    const [email, setEmail] = useState('')
    const [forgotError, setforgotError] = useState(false)
    const [forgotMessage, setforgotMessage] = useState('')
    const [forgotMessageError, setforgotMessageError] = useState('')
    

    const  fncSend= (evt:React.FormEvent) => {
      evt.preventDefault()
     console.log(email)
      forgotPassword(email).then(res=>{
          const status=res.data.status
        
          if(status){
           const message=res.data.message
           setforgotMessage(message)
           setforgotError(false)
          }
         }).catch(error=>{
        
          const err = error as AxiosError
       
          if (err.response) {
            const stResult=JSON.stringify(err.response.data)
            const errorObject:ILogin =JSON.parse(stResult)
            const messageError=errorObject.message
            setforgotMessageError(messageError!)
            setforgotError(true)
            setforgotMessage('')
        }
    });
    
      }


  return (
   
    <div className='mt-3'>
        <div className='mt-3' > <h5 className="text-center"> Please enter your e-mail address for the verification code.</h5> </div>
      <div className='row'>
    
      <div className='col-sm-4'> </div >
      <div className='col-sm-4'>
      <div style={{ display: forgotError === true ? 'block' : 'none'  }} className="alert alert-danger alert-dismissible fade show" role="alert">
              
              <strong>Error!</strong> { forgotMessageError }
              <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setforgotError(false)} > </button> 

            </div>
     <form onSubmit={fncSend}>
     <div className='mt-3'>
      <input onChange={(evt)=>setEmail(evt.target.value)} className='form-control' type='email' placeholder='Email'/>
      </div>
      <br></br>
      <div className="d-grid gap-2">
       <button  className='btn btn-primary' type='submit'>Send </button>
      </div>
      <div>

      </div>
      </form>


      </div>
      
     
      
      <div className='col-sm-4'></div>

      </div >
      <div className='mt-3'>
      <p className='text-center'> {forgotMessage} </p>
      </div>
      </div>

  )
}

export default ForgotPassword