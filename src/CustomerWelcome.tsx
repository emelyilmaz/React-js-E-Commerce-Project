

import { error } from 'console'
import React, { useEffect, useState,useMemo } from 'react'
import ProductCard from './components/ProductCard'
import { ICategory, Results } from './models/ICategory'
import { IProduct, Result } from './models/IProduct'
import           './css/Categorylist.css'

import { categoryList, productList } from './Services'
import { useNavigate } from 'react-router-dom'



function CustomerWelcome() {
  const [arr, setArr] = useState<ICategory>({})
  const[products,setProducts]=useState<Result[]>([])
  const[oldProducts,setOldProducts]=useState<Result[]>([])

  const[categories,setCategories]=useState<Results[]>([])
  const [keyCategory, setkeyCategory] = useState(0)
 
 const [search, setSearch] = useState('')

const navigate=useNavigate()
  
 /*  const memoProducts=  useMemo(() =>{
  
   if(keyCategory!=0){return products.filter(item=>item.category?.id===keyCategory)
   }
    //return products.filter(item=>item.name?.toLocaleLowerCase().includes(itemc.search.toLocaleLowerCase()))
   else
   {return products}
    
  } ,[keyCategory,products] ) */

  useEffect(() => {
    
    setProducts( oldProducts )
    if ( keyCategory != 0 ) {
      
      const newArr = oldProducts.filter(item=>item.category?.id===keyCategory)
      
      setProducts(newArr)
      console.log(newArr)
    }
  } ,[keyCategory])

 
  
  useEffect(() => {
  
    allproj()

    categoryList().then(res=>{
      setArr( res.data )
     setCategories(res.data.result!)
     

    }).catch(error=>{console.log(error)})
  }, [])



  const allproj = () => {
    console.log( "call" )
    productList().then( res => {
       
      const products:IProduct = res.data
      const currentProduct = products.result!.filter( item => item.stockQuantity != 0 )
      setProducts(currentProduct)
      setOldProducts(currentProduct)
    


    
  } ).catch()
  }

  
  useEffect(() => {
    setProducts( oldProducts )
    if ( search !== '' ) {
      const newArr = oldProducts.filter(item => item.name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()) )
      setProducts(newArr)
    }
  }, [search])

  return (
    <div className='row' >

   
    <div className="menu">
    <ul >
    <li onClick={()=>{setkeyCategory(0)}}  className="liste">
      <a   href="#" className="list-group-item list-group-item-action">
        <span style={{paddingLeft:10,paddingRight:10}}className='border border-success p-2 mb-2'>
         All categories</span>
          </a> </li> 
    {categories.map((item,index)=>
      
    <li onClick={()=>{setkeyCategory(Number(item.id))}}  key={item.id}  className="liste">
      <a  key={item.id} href="#" className="list-group-item list-group-item-action">
        <span style={{paddingLeft:10,paddingRight:10}}className='border border-success p-2 mb-2'>
          {item.categoryName}</span>
          </a> </li> 
      
    )}
    </ul> 
 </div>

 <div className='row'>
      <div className='col-sm-3'>
        <div className='mt-3'>
          <input type='search' onChange={(evt) => setSearch(evt.target.value)} className='form-control' placeholder='Search..'></input>
        </div>
      </div>
      <div className='col-sm-8'></div>
      <div className='col-sm-1'>
      <button  onClick={(evt)=>{navigate('/myChart')} } type="button" className="btn btn-success position-relative btn-lg">
        <i className="bi bi-basket2"></i>
        <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger " style={{ borderRadius: 30, width: 40 }}>
          <span>4</span>
        </span>
      </button>
      </div>
 </div>
 
 <div className='row mt-3'>
    
    {products.map((item)=>
              
              <ProductCard key={item.id} result={item}  updateProducts ={ allproj } /> 
            
                  )
          } 
  
  
    </div>
  </div>
   
    
  )
}

export default CustomerWelcome