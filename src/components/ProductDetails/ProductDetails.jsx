import React, { useContext, useEffect, useState } from 'react'
import style from "./ProductDetails.module.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast';




export default function ProductDetails() {

  let {id,category} = useParams()
  const [product, setproduct] = useState(null)
  const [relatedProducts, setrelatedProducts] = useState([])
  let {addProductToCart,cartItems,setcartItems} = useContext(CartContext)
  let {addProductToWishlist,wishlistItems,setwishlistItems} = useContext(WishlistContext)

  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  const [likedProducts, setLikedProducts] = useState({}) 
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

  function getProduct(id){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=>{
      console.log(res.data.data)
      setproduct(res.data.data)
    })
    .catch((res)=>{console.log(res)})

  }

  function getAllProducts(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
    let related = res.data.data.filter((product)=>product.category.name == category)
    setrelatedProducts(related)
    console.log(related)

    })
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

  useEffect(()=>{
    getProduct(id)
    getAllProducts()
  },[id,category])

  return( <>
  <div className='row items-center text-left'>
    <div className='w-1/4'>
    <Slider {...settings}>
      {product?.images.map((src)=><img key={product.id} src={src} className="w-full"/>)}  
    </Slider>    
    </div>
    <div className='w-3/4 p-4'>
    <div className='flex justify-between'>
    <h3 className='font-semibold capitalize text-2xl'>{product?.title}</h3>
    <button onClick={() => addToWishlist(product.id)}>
                <i className={`fa-solid fa-heart text-3xl ${likedProducts[product?.id] ? 'text-red-600' : 'text-gray-500'}`}></i>
              </button>    </div>
    <h4 className='text-gray-700 my-4'>{product?.description}</h4>
    <h4 className=''>{product?.category.name}</h4>
    <div className='flex justify-between my-5 p-3'>
      <span>{product?.price}EGP</span>
      <span><i className='fas fa-star text-yellow-400'></i>{product?.ratingsAverage}</span>
    </div> 
    <button className='btn' onClick={()=>addToCart(product.id)}>{loading && currentId == product.id?<i className='fas fa-spinner fa-spin'></i>:"Add to cart"}</button>      
    </div>
  </div>

  <div className='row justify-center gap-4'>
    {relatedProducts.length>0? relatedProducts.map((product)=>(
        <div key={product.id} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
        <div className='product pb-7'>
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
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
                <i className={`fa-solid fa-heart text-3xl ${likedProducts[product?.id] ? 'text-red-600' : 'text-gray-500'}`}></i>
              </button>
            </div>
        <button className='btn' onClick={()=>addToCart(product.id)}>{loading && currentId == product.id?<i className='fas fa-spinner fa-spin'></i>:"Add to cart"}</button>      
        </div>
      </div>
    )):<span className="loader"></span>}
  </div>
  </>
  )
}
