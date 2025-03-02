import React, { useContext } from 'react'
import style from "./Navbar.module.css"
import logo from "../../assets/freshcart-logo.svg"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { CartContext } from '../../Context/CartContext'
import { WishlistContext } from '../../Context/WishlistContext'


export default function Navbar() {
  let {userLogin,setuserLogin}=useContext(UserContext)
  let {cartItems,setcartItems}=useContext(CartContext)
  let {wishlistItems, setwishlistItems}=useContext(WishlistContext)
  let navigate =useNavigate()

  function signout(){
    localStorage.removeItem("userToken")
    setuserLogin(null)
    navigate("/login")
  }

  return <>


<nav className="bg-slate-300 fixed top-0 left-0 right-0 z-50">
    <div className="flex flex-wrap justify-center gap-3 lg:justify-between items-center mx-auto max-w-screen-xl p-4">
      <div className='flex items-center gap-5'>
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" width={120} alt="Flowbite Logo" />
        </Link>

      {userLogin != null ?<> <ul className='flex gap-4'>
          <li><Link className='text-slate-600' to="">Home</Link></li>
          <li><Link className='text-slate-600 relative' to="cart">Cart
          <div className='absolute top-[-15px] right-[-15px] size-5 text-xs bg-emerald-600 text-white rounded-full flex justify-center items-center'>{cartItems}</div>
          </Link></li>
          <li><Link className='text-slate-600 relative' to="wishlist">Wishlist
          <div className='absolute top-[-15px] right-[-15px] size-5 text-xs bg-emerald-600 text-white rounded-full flex justify-center items-center'>{wishlistItems}</div>
          </Link></li>
          <li><Link className='text-slate-600' to="products">Products</Link></li>
          <li><Link className='text-slate-600' to="categories">Categories</Link></li>
          <li><Link className='text-slate-600' to="brands">Brands</Link></li>
        </ul></>:null}

      </div>



        
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          <ul className='flex gap-5'>
            <li><i className='fab fa-instagram'></i></li>
            <li><i className='fab fa-tiktok'></i></li>
            <li><i className='fab fa-facebook'></i></li>
            <li><i className='fab fa-twitter'></i></li>
            <li><i className='fab fa-linkedin'></i></li>
            <li><i className='fab fa-youtube'></i></li>
          </ul>
          
          <ul className='flex gap-3'>
          {userLogin != null?<><li><span onClick={signout} className='cursor-pointer'>Signout</span></li>
            </>:<> <li><Link to="login">Login</Link></li>
            <li><Link to="register">Register</Link></li></>}
          </ul>
        </div>
    </div>
</nav>

  </>
}
