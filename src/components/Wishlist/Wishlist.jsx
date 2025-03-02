import React, { useContext, useEffect, useState } from 'react'
import style from "./Wishlist.module.css"
import { WishlistContext } from '../../Context/WishlistContext'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';


export default function Wishlist() {

  let { getLoggedUserWishlist, deleteWishlistItem, wishlistItems,setwishlistItems } = useContext(WishlistContext)
  const [WishlistDetails, setWishlistDetails] = useState(null)
  let {addProductToCart,cartItems,setcartItems} = useContext(CartContext)
  const [loading, setloading] = useState(false)
  const [currentId, setcurrentId] = useState(0)
  

  async function getWishlistItems() {
    let response = await getLoggedUserWishlist()
    if (response.data.status === "success") {
      setWishlistDetails(response.data)  
    }
  }

  async function deleteItem(productId) {
    let response = await deleteWishlistItem(productId); 
    if (response.data.status === "success") {
      setwishlistItems(wishlistItems - 1);  
      getWishlistItems();  
      toast.success("Product deleted successfully");
    } else {
      toast.error("Error");
    }
  }
  

  async function addToCart(id) {
    setcurrentId(id);
    setloading(true);
  
    let response = await addProductToCart(id); 
    console.log(response.data);
  
    if (response.data.status === "success") {
      setcartItems(cartItems + 1); 
      toast.success(response.data.message);
  
      await deleteItem(id);
  
      setloading(false);
    } else {
      toast.error(response.data.message);
      setloading(false);
    }
  }
  

  useEffect(() => {
    getWishlistItems()
  }, [])

  return (
    <>
      {WishlistDetails?.data?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {WishlistDetails?.data?.map((product) => (
                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                  <td className="p-4">
                    <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                  <div className='flex justify-center items-center gap-4'>
                  <span onClick={() => deleteItem(product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
                  <button className='btn' onClick={()=>addToCart(product.id)} >Add to cart</button>        
                  </div>                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className='text-3xl font-bold text-red-600 '>No product Added</h1>
      )}
    </>
  )
}
