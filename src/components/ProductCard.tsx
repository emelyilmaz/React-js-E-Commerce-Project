import React from 'react'
import { Result } from '../models/IProduct'

function ProductCard(item:{result:Result}) {

  return (



  <div className='col-lg-4'>
  <div className="card mb-4 shadow-sm" >
  <img src="https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" className="card-img-top" alt="..."/>
  <div className="card-body">
    <form>
    <h5 className="card-title"> {item.result.name}</h5>
    <p className="card-text"><b>Detail:</b> {item.result.detail}</p>
    <p className="card-text"><b>Price:</b> {item.result.price} $</p>
    <div className="form-outline">
 
  <input type="number" id="typeNumber" className="form-control" placeholder='Quantity' />

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