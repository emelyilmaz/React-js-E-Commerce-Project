import axios from 'axios'
import { IBasket, Result } from './models/IBasket'
import { ICategory } from './models/ICategory'
import { ICustomerChangePassword } from './models/ICustomerChangePassword'
import { ICustomerRegister } from './models/ICustomerRegister'
import { ILogin } from './models/ILogin'
import { IOrder } from './models/IOrder'
import { IProduct } from './models/IProduct'


const baseURL = 'http://localhost:8092/'


const config = axios.create({
    baseURL: baseURL

})

const configJwt =()=>{
    const data=sessionStorage.getItem('data')
    const datao:ILogin=JSON.parse(data!)
 
    const token="Bearer ".concat(datao.jwt!)
    return(axios.create({
        baseURL: baseURL,
       
        headers: { 
           
                Authorization: token
           
        }}))
    
}



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

    return config.post<ICustomerRegister>('customer/register',sendParams ) 

}    

export const forgotPassword=(email:string)=>{
 
    return config.post("forgotPassword?email="+email)
}

export const resetPassword=( verificationCode:string ,password:string)=>{
 
    const sendParams = { 
        verificationCode: verificationCode,
         password: password
    }
    return config.put("resetPassword?resettoken="+verificationCode+"&password="+password)
}


window.onunload = function () {
	sessionStorage.removeItem('result');
}
export const productList=()=>{
    
 return configJwt().get<IProduct>("product/list")
} 

export const categoryList=()=>{
    
    return configJwt().get<ICategory>("category/list")
   } 

   export const basketAdd = (product: {}, quantity: number )=>{  
    
    const sendParams = { 
        product:product,
        quantity:quantity
       
       

    }

    return configJwt().post('basket/add',sendParams ) 

}   

export const profileChange = (name: string, surname: string,  email: string, phone: string) => {                    
    
  
    return configJwt().put<ICustomerRegister>("customer/setting?firstName="+name+"&secondName="+
    surname+"&email="+email+"&telephone="+phone ) 

}    
export const orderList=()=>{
    
    return configJwt().get<IOrder>("order/customer")
   } 

   export const basketList=()=>{
    const data=sessionStorage.getItem('data')
    const datao:ILogin=JSON.parse(data!)
    const email=datao.result?.email

    return configJwt().get<IBasket>("basket/customer?email="+email)
   } 

   export const orderComplete=(baskets:Result[])=>{
   
    return configJwt().post<IOrder>("order/add",baskets)
   } 

   export const changePassword = (oldPassword: string, newPassword: string)=>{
  
    return configJwt().put<ICustomerChangePassword>("customer/changePassword?oldPassword="+oldPassword+"&newPassword="+newPassword)
 }

  