import axios from 'axios'
import { ICustomerRegister } from './models/ICustomerRegister'
import { ILogin } from './models/ILogin'


const baseURL = 'http://localhost:8092/'

const config = axios.create({
    baseURL: baseURL
    
    // params: {
    //     ref: ref   //her seferinde servis aktivitesine referansımızı gönder.
    // },
    // headers: { Authorization: `Bearer` }
})


export const userLogin = (email: string, password: string) => { 
    
    const sendParams = { 
        username: email,
        password: password,
       
    }

   return config.post<ILogin>('login',sendParams )
    
}

export const customerRegister = (name: string, surname: string,  email: string, phone: string,password: string) => { //yazdığımız özelliği dışarda görmek için kullanırız.                     
    
    const sendParams = { 
        firstName: name,
        secondName: surname,
        email: email,
        telephone: phone,
         password: password

    }

    return config.post<ICustomerRegister>('customer/register',sendParams ) //bu body yollarken  post//null header

}    

export const forgotPassword=(email:string)=>{
 
    return config.post("forgotPassword?email="+email)
}
