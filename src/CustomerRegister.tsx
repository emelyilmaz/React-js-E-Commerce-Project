import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ICustomerRegister } from './models/ICustomerRegister';
import { customerRegister } from './Services';


function CustomerRegister() {



    // sayfa geçiş hareketleri için kullanılan bir yonmtmdir
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerError, setRegisterError] = useState(false) //kullanıcı giriş yapınca true yapıcaz
    const [registerMessage, setRegisterMessage] = useState('')
             
    const [emailError, setEmailError] = useState('')
    const [nameError, setNameError] = useState('')
    const [surnameError, setsurnameError] = useState('')
    const [phoneError, setphoneError] = useState('')
    const [passwordError, setpasswordError] = useState('')
   

    const fncSend = (evt: React.FormEvent) => {
        evt.preventDefault();

        customerRegister(name, surname, email,phone ,password).then(res => {

            const status = res.data.status  
            const result = res.data.result           
           
            if (status) {
                setRegisterError(false)
                navigate('/')
            } 


        }).catch(error=>{
    
            const err = error as AxiosError
            console.log(err)
         
            if (err.response) {
              const stResult=JSON.stringify(err.response?.data)
              
              const errorObject:ICustomerRegister =JSON.parse(stResult)
              const errors=errorObject.error!
            
             errors.map((err=>{
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
                else{
                    setpasswordError(err.password!)
                }
                
                          
             }))
             
              const messageError=errorObject.message
           
              if(messageError!=null){
                setRegisterError(true)
                setRegisterMessage(messageError!)
              }
       
             
          }
      });



    }



    return (
        <>
            <div className="row">
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    <h1>Customer Register</h1>
                    <div style={{ display: registerError === true ? 'block' : 'none' }} className="alert alert-danger alert-dismissible fade show" role="alert">
                        <strong>Error!</strong> {registerMessage} 
                        <button type="button" className="btn-close" aria-label="Close" onClick={(evt) => setRegisterError(false)}  ></button>
                    </div>
                    <form onSubmit={fncSend} >

                        <div className={nameError!=''?"form-control is-invalid":"form-control"}>
                            <input onChange={(evt) => { setName(evt.target.value);setNameError('') } } type="text" className="form-control" placeholder="Name" />
                          </div>
                          <div className="invalid-feedback">{nameError}</div>


                        <div className={surnameError!=''?"form-control is-invalid":"form-control"}>
                            <input onChange={(evt) => { setSurname(evt.target.value);setsurnameError('')}} type="text" className="form-control" placeholder="Surname" />
                        </div>
                        <div className="invalid-feedback">{surnameError}</div>


                        <div className={phoneError!=''?"form-control is-invalid":"form-control"}>
                            <input onChange={(evt) => { setPhone(evt.target.value);setphoneError('') }} type="tel" className="form-control" placeholder="Phone" />
                        </div>
                        <div className="invalid-feedback">{phoneError}</div>


                        <div className={emailError!=''?"form-control is-invalid":"form-control"}>
                            <input onChange={(evt) => { setEmail(evt.target.value) ;setEmailError('')}} type="email" className="form-control" placeholder="e-Mail" />
                        </div>
                        <div className="invalid-feedback">{emailError}</div>



                        <div className={passwordError!=''?"form-control is-invalid":"form-control"}>
                            <input onChange={(evt) => { setPassword(evt.target.value);setpasswordError('') }} type="password" className="form-control" placeholder="Password" />
                        </div>
                        <div className="invalid-feedback">{passwordError}</div>

                        <div className='mt-3'>
                            <a onClick={(evt) => navigate("/")} role="button" className='btn btn-danger'>Back</a>
                            <button className='btn btn-success' type='submit'>Send</button>

                        </div>

                    </form>

                </div>
                <div className="col-sm-4"></div>
            </div>


        </>
    )
}

export default CustomerRegister

