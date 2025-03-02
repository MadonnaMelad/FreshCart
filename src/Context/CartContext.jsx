import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let  CartContext = createContext()

export default function CartContextProvider(props){

    const [cartId, setcartId] = useState(0)
    const [cartItems, setcartItems] = useState(0)
    let headers ={
        token: localStorage.getItem("userToken"),
    };

    function addProductToCart(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`
        ,{
            productId : productId,
        },
    {
        headers,
    }
    ).then((res)=>res).catch((err)=>err)
    }
    
    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`
        ,{
            headers,
        }
        ).then((res)=>{
            // console.log(res.data.data)
            setcartId(res.data.data._id)
            setcartItems(res.data.numOfCartItems)
            return res
        }).catch((err)=>err)
    }

    function updateCartProductQuantity(productId,newCount){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
        ,{
            count:newCount,
        },{
            headers,
        }
        ).then((res)=>res).catch((err)=>err)
    }

    function deleteCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`
        ,{
            headers,
        }
        ).then((res)=>res).catch((err)=>err)
    }

    function checkout(cartId,url,formData){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
       {
        shippingAddress : formData
       },{
        headers,
       }
        ).then((res)=>res).catch((err)=>err)
    }

    function deleteAllCartItems(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`
        ,{
            headers,
        }
        ).then((res)=>res).catch((err)=>err)
    }

    useEffect(()=>{
        getLoggedUserCart()
    },[])
    return <CartContext.Provider value={ {addProductToCart,getLoggedUserCart,updateCartProductQuantity,deleteCartItem,checkout,cartId,cartItems,setcartItems,deleteAllCartItems} }>
        {props.children}
    </CartContext.Provider>
} 