import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function useProducts() {
    function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
      
    let productInfo =useQuery({
        queryKey:['recentProduct'],
        queryFn: getProducts,
        staleTime:20000,
        gcTime:4000,
        select:(data)=> data.data.data
        })


    return productInfo
}
