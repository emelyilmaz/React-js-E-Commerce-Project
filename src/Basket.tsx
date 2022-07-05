import { green } from '@mui/material/colors'
import { Console } from 'console'
import React, { useEffect, useState } from 'react'
import { IBasket, Result } from './models/IBasket'
import { basketList, orderComplete } from './Services'

function Basket() {
  const [result, setresult] = useState<Result[]>([])
  const [click, setClick] = useState(false)



  const fncSend=()=>{
    if(checkList.length>0){
      orderComplete(checkList).then(res=>{
        const status=res.data.status
        if(status){
          alert("Order is created successfully")
          setresult([])
        }
    
      })}else{
      alert("Please choose" )
      }
    }
 

  useEffect(() => {
  
    basketList().then(res=>{
      const fulldata:IBasket=res.data
      const status=fulldata.status
      const result=fulldata.result!
     
      if(status){  setresult(result)
    
      }
  
    }).catch()

   
      
    }, [result])
  
    const [checkList,setcheckList]=useState<any[]>([])

    const handleCheckss = (event:React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const bascet:Result=JSON.parse(value)
    if (checked) {
      
      console.log(value)
      checkList.push( bascet)
     

    }else{
      checkList.splice(checkList.indexOf((bascet)), 1);

    }
    console.log(checkList)
   

  
    
    
  };

  return (
    <>
    <div className='mt-3 mb-3' >
    <h3 className='text-center' style={{color:'#198754'}}>My Bascet</h3>
    </div>
  
    <table className="table">
    <thead>
      <tr>
        <th scope="col">No</th>
        <th scope="col">Product Name</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th scope="col">Choose</th>
      </tr>
    </thead>
    <tbody>
      <>
      {

         

        result.map((res,index)=>{
          return(<tr>
            <th scope="row">{index+1}</th>
           
            <td>{res.product?.name}</td>
            <td>{res.product?.price}</td>
            <td>{res.quantity}</td>
            <td > <input key={index+1} onChange={handleCheckss} className="form-check-input" type="checkbox" id="checkbox"
             value={ JSON.stringify(res) } aria-label="..."></input></td>
            <td>{click}</td>
          </tr>)
      

        })
        
      }
      </>
      
     
    
     
    </tbody>
  </table>
  <div className='row mt-3'>

    <div className='col-sm-10'></div>
    <div className='col-sm-2 mt-3'>  <button   onClick={fncSend} type="button" className="btn btn-success">Complete Order</button>
     </div>

  </div>

    </>
    
  )
}

export default Basket