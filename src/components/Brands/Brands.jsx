import React, { useEffect, useState } from 'react'
import style from "./Brands.module.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'

export default function Brands() {

  const [brands, setbrands] = useState([])
  const [selectedBrand, setselectedBrand] = useState([])
  const [isModalOpen, setisModalOpen] = useState(false)
  let {id}=useParams()

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
    console.log(res.data.data)
    setbrands(res.data.data)
  })
    .catch((err)=>err)
  }

  function showBrand(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then((res)=>{
      console.log(res.data)
      setselectedBrand(res.data.data)
      setisModalOpen(true)
      //setismodalopen
    })
    .catch((err)=>{err})
  }

  useEffect(()=>{
    getBrands()
  },[])
  return(<>
  <h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>All Brands</h2>
  <div className='row' >
    {brands?.map((product)=>( <div key={product._id} onClick={()=>{showBrand(product._id)}} className='w-1/4 p-5 hover:shadow-emerald-500 hover:shadow-lg transition-all '>
      <img src={product.image} alt="" />
      <h3>{product.name}</h3>
      </div>))}
  </div>

  {isModalOpen && <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={() => setisModalOpen(false)}>
          <div className="bg-white p-4 rounded relative">
          <i className="fa-solid fa-xmark text-3xl absolute top-2 right-2 cursor-pointer"onClick={() => setisModalOpen(false)}></i>
          <div className='flex justify-center gap-4 items-center'>  <h1 className='text-3xl text-emerald-700 font-bold'>{selectedBrand?.name}</h1>
          <img src={selectedBrand?.image} alt="" /></div>
            <button className='rounded bg-slate-500 py-2 px-5 text-white' onClick={() => setisModalOpen(false)}>Close</button> {/* زر إغلاق */}
          </div>
        </div>}
  </>)
} 
