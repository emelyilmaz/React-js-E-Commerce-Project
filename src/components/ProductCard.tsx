import { AxiosError } from 'axios';
import React, { FC, useState } from 'react'
import { Result } from '../models/IProduct'
import { basketAdd } from '../Services';
import { IBasket } from '../models/IBasket'


function ProductCard(item:{result:Result, updateProducts: any}) {
 
  const [quantity, setQuantity] = useState(0)
  const [errorMesaage, seterrorMesaage] = useState('')
  const [errorQunatity, seterrorQuantity] = useState('')
 
   
 
  
  
  const fncSend = (evt: React.FormEvent) => {
    evt.preventDefault();
    
    basketAdd(item.result,quantity).then(res => {
  
      const status = res.data.status  
      const result = res.data.result 
      
      if(status){
       try{
        alert("Product was added your basket")

        item.updateProducts()
       
       }catch(err){console.log(err)}
        
 
      }

  }).catch(error=>{
    
    const err = error as AxiosError
 
    if (err.response) {
      const stResult=JSON.stringify(err.response?.data)
      
      const errorobject:IBasket =JSON.parse(stResult)
      const errorMesaage=errorobject.message!
      if(errorMesaage!=null){ alert(errorMesaage)}
     

      const errors=errorobject.error!
            
      errors.map((err=>{
        if(err.quantity!=null){
           seterrorQuantity(err.quantity)
          
           
        }
      }
      ))
                   

  }
});
  }


  return (


  <div className='col-lg-4'>
  <div className="card mb-4 shadow-sm" >
  <img src={'https://api.lorem.space/image/shoes?w=300&h=300&nazli='+item.result.id}/>
  <div className="card-body">
    <form onSubmit={fncSend}>
    <h5 className="card-title"> {item.result.name}</h5>
    <p className="card-text"><b>Detail:</b> {item.result.detail}</p>
    <p className="card-text"><b>Price:</b> {item.result.price} $</p>
    <div className="form-outline">
       <div className={errorQunatity!=''?"form-control is-invalid":"form-control"}>
        <input onChange={(evt) => { setQuantity(  Number(evt.target.value) );seterrorQuantity('')}} type="number" min="1" max={item.result.stockQuantity} id="typeNumber" className="form-control" placeholder='Quantity' />
       </div>
       <div className="invalid-feedback">{errorQunatity}</div>
    </div>
    <br />
    <div className="d-grid gap-2">
    <button   style={{backgroundColor:"#1F4690"}}className='btn btn-primary'> <i  style={{fontSize:"22px",color:'darkorange'}} className="bi bi-basket2"/> Add Chart  </button>
    </div>
    </form>

  </div>
</div>

  </div>

  )
}

export default ProductCard