import { AxiosError } from 'axios'
import { Session } from 'inspector'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ICustomerRegister, Result } from './models/ICustomerRegister'


import { profileChange } from './Services'

function ChangeProfile() {
  

const [firstName, setfirstName] = useState('')
const [secondName, setseconName] = useState('')
const [email, setEmail] = useState('')
const [telephone, setTelephone] = useState('')

const [ProfileError, setProfileError] = useState(false) 
    const [ProfileMessage, setProfileMessage] = useState('')
             
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setsurnameError] = useState('')
    const [phoneError, setphoneError] = useState('')

   
    useEffect(() => {
        
        console.log(telephone)
        const customerString=sessionStorage.getItem("result")
        if(customerString){
            const customer:Result=JSON.parse(customerString) 
          setfirstName(customer.firstName!)
          setseconName(customer.secondName!)
          setEmail(customer.email!)
          setTelephone(customer.telephone!)
        }
       
      },[])



    const fncSend = (evt: React.FormEvent) => {
      evt.preventDefault();
      
      console.log(firstName,telephone,secondName)
      profileChange(firstName ,secondName, email ,telephone).then(res => {
        const status = res.data.status  

        if (status) {
            setProfileError(false)
           
            alert("Update process is successful")
            const customerString=sessionStorage.getItem("result")
            const customer:Result=JSON.parse(customerString!) 
            const newResult:Result={
             
              id: Number( customer.id) ,            
              firstName:firstName ,      
              secondName:secondName , 
              telephone:telephone,             
              email:customer.email,             
              password:customer.password,         
              enabled:customer.enabled,            
              tokenExpired:customer.tokenExpired ,    
              roles:customer.roles ,       
              resetPasswordToken: customer.resetPasswordToken

            }
 
            sessionStorage.setItem("result",JSON.stringify(newResult)  )
        } 

      }).catch(error=>{
    console.log(error)
        const err = error as AxiosError
     
        if (err.response) {
          const stResult=JSON.stringify(err.response?.data)
          
          const errorObject:ICustomerRegister =JSON.parse(stResult)
          const errors=errorObject.error!
        
         errors.map(((err)=>{
            if(err.firstName!=null){
               setNameError(err.firstName)
               
            }else if(err.secondName!=null){
                setsurnameError(err.secondName!)
            }
            else if(err.telephone!=null){
                setphoneError(err.telephone!)
                
            }else if(err.email!=null){
                setEmailError(err.email!)
                }
    
         }))
 
      }
  });



    }


  return (
    <>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <h3 style={{color:"#1F4690"}} className="text-center"><i  style={{fontSize:"36px",color:'darkorange'}} className="bi bi-gear" ></i>  Change Profile </h3>
                   
                    <div style={{ display: ProfileError === true ? 'block' : 'none' }} className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {ProfileMessage} 
                        <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setProfileError(false)}  ></button>
                    </div>
                    <form onSubmit={fncSend}  >
                        <div className="mt-3">
                        
                            <input onChange={(evt) => { setfirstName(evt.target.value);setNameError('') } } type="text" className={nameError!==''?"form-control is-invalid":"form-control"
                          } defaultValue={firstName} placeholder="Name" required />
                         
                          <div className="invalid-feedback">{nameError} </div>
                        </div>
                       
                       <div className="mt-3">
                       
                            <input onChange={(evt) => { setseconName(evt.target.value);setsurnameError('')}} type="text" className={surnameError!==''?"form-control is-invalid":"form-control"} defaultValue={secondName}  placeholder="Surname" required />
                      
                        <div className="invalid-feedback">{surnameError}</div>
                           </div>

                       
                        <div className="mt-3">
                         
                            <input onChange={(evt) => { setTelephone(evt.target.value);setphoneError('') }} type="tel" 
                            className={phoneError!==''?"form-control is-invalid":"form-control"}defaultValue={telephone} placeholder="Phone" required />
                        
                        <div className="invalid-feedback">{phoneError}</div>

                     </div>

                     <div className="mt-3">
                    
                            <input onChange={(evt) => {  setEmailError('')}} type="email" 
                           className={emailError!==''?"form-control is-invalid":"form-control"} value={email} placeholder="e-Mail" />
                       
                        <div className="invalid-feedback">{emailError}</div>
                        </div>  

                       <div className='mt-3'>
                       <div className='d-grid gap-2'>
                         
                         <button className='btn btn-success' type='submit'><b>SUBMIT</b></button>

                     </div>
                       </div>

                       

                    </form>

                </div>
                <div className="col-sm-4"></div>
            </div>


        </>
  )
}

export default ChangeProfile