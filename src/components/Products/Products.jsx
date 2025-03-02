import React, { useContext, useState } from 'react'
import style from "./Products.module.css"
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import useProducts from '../../Hooks/useProducts'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast';


export default function Products() {

  const location =useLocation()
  let {data,isError,error,isLoading,isFetching} =useProducts()
  let {addProductToCart,cartItems,setcartItems} = useContext(CartContext)
  let {addProductToWishlist,wishlistItems,setwishlistItems} = useContext(WishlistContext)

  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  const [likedProducts, setLikedProducts] = useState({}) 
  
    // console.log(data?.data?.data)
  
    if(isError){
      return <h3>{}</h3>
    }
  
    if(isLoading){
      return <span className="loader"></span>
    }
  
  
    async function addToCart(id){
      setcurrentId(id)
      setloading(true)
      let response = await addProductToCart(id)
      if(response.data.status == "success"){
        setcartItems(cartItems + 1)
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
      setloading(false)
    }
  
    async function addToWishlist(id){
      setcurrentId(id)
      let response = await addProductToWishlist(id)
      if(response.data.status == "success"){
        setwishlistItems(wishlistItems + 1)
        setLikedProducts(prev => ({...prev, [id]: true})) // تحديث حالة الـ likedProducts
        toast.success(response.data.message)
      } else {
        toast.error(response.data.message)
      }
    }
      // const [products, setproducts] = useState([])
  
    // function getProducts(){
    //   axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //   .then((res)=>{
    //     console.log(res.data.data)
    //     setproducts(res.data.data)
    //   })
    //   .catch((res)=>{})
    // }
  
    // useEffect(()=>{
    //   getProducts()
    // },[])
  
    return(
    <div className='row justify-center gap-4'>
      {data.map((product)=>(
        <div key={product.id} className='w-1/6'>
          <div className='product pb-7'>
          <Link to={`${location.pathname}productdetails/${product.id}/${product.category.name}`}>
            <img src={product.imageCover} className='w-full' alt="" />
            <h3 className='text-emerald-600'>{product.category.name}</h3>
            <h3 className='font-semibold mb-3'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
          </Link>
          <div className='flex justify-between p-3'>
            <span>{product.price}EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div> 
          <div>
              <button onClick={() => addToWishlist(product.id)}>
                <i className={`fa-solid fa-heart text-3xl ${likedProducts[product.id] ? 'text-red-600' : 'text-gray-500'}`}></i>
              </button>
            </div>
          <button className='btn' onClick={()=>addToCart(product.id)}>{loading && currentId == product.id?<i className='fas fa-spinner fa-spin'></i>:"Add to cart"}</button>      
          </div>
        </div>
      ))}
    </div>
    )
}
