import React from 'react'
import { Navigate } from 'react-router-dom'
import NavBarCustomer from './components/NavBarCustomer'
import{Result} from './models/ILogin'

function Security(item:{componet:JSX.Element}) {

const control=()=>{
    const stSession=sessionStorage.getItem("result")
   
    if(stSession){
        try { 
            const result:Result  =JSON.parse(stSession)
        
     return result
        } catch (error) {
            sessionStorage.removeItem('result')
            return null
        }
     
    }else{
        return null
    }

}


const resultcontrol=control();

  return (
    resultcontrol!=null&&resultcontrol.roles![0].id===3?
    <><NavBarCustomer result={resultcontrol}  /> <div className='mt-2'>{item.componet}</div> </>:<Navigate to='/'/>

  )
}

export default Security