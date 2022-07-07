import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { ICustomerChangePassword } from './models/ICustomerChangePassword'
import { ICustomerRegister } from './models/ICustomerRegister'
import { changePassword } from './Services'

function ChangePassword() {
  const [oldpassword, setOldPassword] = useState('')
  const [newPassword, setnewPassword] = useState('')
  const [oldpasswordError, setoldpasswordError] = useState('')
  const [newPassworError, setnewPassworError] = useState('')
  const [messageError, setmessageError] = useState('')
  const [isMessageError, setisMessageError] = useState(false)

  const fncSend=(evt: React.FormEvent)=>{
    evt.preventDefault();

    changePassword(oldpassword,newPassword).then(res=>{

    const status=res.data.status
    if (status){
      setisMessageError(false)
      alert("Password was changed successfully")
    }

    }).catch(error=>{
         const err= error as AxiosError

         if(err.response){
          const stData=JSON.stringify(err.response?.data)
           console.log(stData)
          const objectData:ICustomerChangePassword=JSON.parse(stData)
       
          const errors=objectData.error!
         
          if(errors!=null){
            errors.map((e=>{
              if(e.newPassword! !=null){
              
                setnewPassworError(e.newPassword)
                console.log(newPassworError)
              }else{
                setoldpasswordError(e.oldPassword!)
              }
            
            }))
          }
          
          
        const messageError=objectData.message!
        if( messageError!=null )
        console.log(messageError)
            setisMessageError(true)
            setmessageError(messageError)
         }

    });
    

    
  }



  return (



    <div className='row mt-3'>
   <div className='col sm-4'>   </div>
   <div className='col sm-4'>  
   <h3 style={{color:"#1F4690"}} className="text-center"><i  style={{fontSize:"36px",color:'darkorange'}} className="bi bi-gear" ></i>  Change Password </h3>
                    <div style={{ display: isMessageError === true ? 'block' : 'none' }} className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {messageError} 
                        <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setisMessageError(false)}  ></button>
                    </div>
     <form onSubmit={fncSend}  >
   <div className='mt-3'>
     <input onChange={(evt) => { setOldPassword(evt.target.value);setoldpasswordError('') }} type="password"  className={oldpasswordError!=''?"form-control is-invalid":"form-control"}
      placeholder="Current Password" />
     <div className="invalid-feedback">{oldpasswordError}</div>
     </div>
     <div className='mt-3'>
     <input onChange={(evt) => { setnewPassword(evt.target.value);setnewPassworError('') }} type="password"  className={newPassworError!=''?"form-control is-invalid":"form-control"} 
     placeholder=" New Password" />
     <div className="invalid-feedback">{newPassworError}</div>
     </div>

     <div className=' d-grid gap-2  mt-3'>
    
          <button className='btn btn-success' type='submit'><b>SUBMIT</b></button>
     </div>

    </form>

    </div>
   <div className='col sm-4'>   </div>




    </div>
  )
}

export default ChangePassword