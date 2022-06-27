

import { error } from 'console'
import React, { useEffect, useState,useMemo } from 'react'
import ProductCard from './components/ProductCard'
import { ICategory, Results } from './models/ICategory'
import { IProduct, Result } from './models/IProduct'
import           './Categorylist.css'

import { categoryList, productList } from './Services'



function CustomerWelcome() {
  const [arr, setArr] = useState<ICategory>({})
  const[products,setProducts]=useState<Result[]>([])

  const[categories,setCategories]=useState<Results[]>([])
  const [keyCategory, setkeyCategory] = useState(0)
 // const [search, setsearch] = useState('')
  
  const memoProducts=  useMemo(() =>{
  
   if(keyCategory!=0){return products.filter(item=>item.category?.id===keyCategory)
   }
    //return products.filter(item=>item.name?.toLocaleLowerCase().includes(itemc.search.toLocaleLowerCase()))
   else
   {return products}
    
  } ,[keyCategory,products] )

 
  
  useEffect(() => {
  
    productList().then( res => {
       
        const products:IProduct = res.data
        const currentProduct = products.result!.filter( item => item.stockQuantity != 0 )
        setProducts(currentProduct)
       // setkeyCategory(0)

      
    } ).catch()

    categoryList().then(res=>{
      setArr( res.data )
     setCategories(res.data.result!)
     

    }).catch(error=>{console.log(error)})
  }, [])

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
 
 <br></br>
  <br></br>
  
  {memoProducts.map((item)=>
            
            <ProductCard key={item.id} result={item} /> 
           
                )
         } 
 
 
  </div>
   
    
  )
}

export default CustomerWelcome