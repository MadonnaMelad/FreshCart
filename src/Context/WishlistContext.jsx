import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

export let  WishlistContext = createContext()

export default function CartContextProvider(props){

    const [wishlistId, setwishlistId] = useState(0)
    const [wishlistItems, setwishlistItems] = useState(0)
    let headers ={
        token: localStorage.getItem("userToken"),
    };

    function addProductToWishlist(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`
        ,{
            productId : productId,
        },
    {
        headers,
    }
    ).then((res)=>res).catch((err)=>err)
    }
    function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers,
        })
        .then((res) => {
            res.data.data.forEach(product => {
                // console.log(product._id);  
                setwishlistId(product._id)
            });  
            (res.data.data);  
            setwishlistItems(res.data.count); 
            return res;
        })
        .catch((err) => err);
    }
    


    function deleteWishlistItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`
        ,{
            headers,
        }
        ).then((res)=>res).catch((err)=>err)
    }

    // function checkout(cartId,url,formData){
    //     return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
    //    {
    //     shippingAddress : formData
    //    },{
    //     headers,
    //    }
    //     ).then((res)=>res).catch((err)=>err)
    // }


    useEffect(()=>{
        getLoggedUserWishlist()
    },[])
    return <WishlistContext.Provider value={ {addProductToWishlist,getLoggedUserWishlist,deleteWishlistItem,wishlistId,wishlistItems,setwishlistItems} }>
        {props.children}
    </WishlistContext.Provider>
} 