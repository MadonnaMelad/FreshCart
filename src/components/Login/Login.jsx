import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { Formik, useFormik } from 'formik'
import * as yup from "yup"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'


export default function Login() {
  let {userLogin,setuserLogin} =useContext(UserContext)
  const navigate = useNavigate()
  const[ApiError,setApiError] = useState("")
  const[isLoading,setisLoading] = useState(false)

  function handleLogin(values){
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
      setisLoading(false)
      // console.log(res)
      if(res.data.message == "success"){
        localStorage.setItem("userToken",res.data.token)
        setuserLogin(res.data.token)
        navigate('/')
      }
    })
    .catch((res)=>{setisLoading(false)
      setApiError(res.response.data.message)})
  }

  
  let myValidation= yup.object().shape({
    email : yup.string().email("email is not valid").required("email is required"),
    password : yup.string().required("password is required").min(6,"password min length is 6"),
  })

  let formik = useFormik({
    initialValues :{
    email:"",
    password:"",
    },
    validationSchema : myValidation ,
    // validate : myValidation ,
    onSubmit : handleLogin
  })



  return <>
 
  <h2 className='font-bold text-2xl text-center my-4 text-emerald-700'>Login Now</h2>
<form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
  <div className="relative z-0 w-full mb-5 group">
      <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="floating_email" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
      {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <span className="font-medium">{formik.errors.email}</span> 
      </div> : null}
  </div>
  <div className="relative z-0 w-full mb-5 group">
      <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" " required />
      <label htmlFor="floating_password" className="peer-focus:font-medium left-0 absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
      {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 " role="alert">
        <span className="font-medium">{formik.errors.password}</span> 
      </div> : null}
  </div>
  
  <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{isLoading?<i className='fas fa-spinner fa-spin'></i>:"Login"}</button>

  <div className='text-center mt-3 flex-col'>
  <Link to="/register"><span className='text-blue-500 underline'>don't you have an account ? signup Now</span></Link>
  </div>
  {/* <div className='text-center mt-3 flex-col'>  
    <Link to="/forgetpassword"><span className='text-blue-500 underline'>Forget Password?</span></Link>
  </div> */}
  {ApiError ? <div className="p-4  m-4 text-sm text-red-50 rounded-lg bg-red-600 " role="alert">
        <span className="font-medium">{ApiError}</span> 
      </div> : null}
  </form>
    </>
}
