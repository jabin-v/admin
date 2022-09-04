import {store} from "../../app/store";
import { productsApiSlice } from "../products/productsApiSlice";
import { ordersApiSlice } from "../orders/ordersApiSlice";
import { categoriesApiSlice } from "../categories/categoriesApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";


import React from 'react'

const Prefetch = () => {
useEffect(()=>{

    console.log("subscribing")

    const products=store.dispatch(productsApiSlice.endpoints.getProducts.initiate());
    const orders=store.dispatch(ordersApiSlice.endpoints.getOrders.initiate())
    const categories=store.dispatch(categoriesApiSlice.endpoints.getCategories.initiate())


    return()=>{
        console.log("unsubscribibg");

        products.unsubscribe();
        orders.unsubscribe();
        categories.unsubscribe();
    }

},[])


  return (
    <Outlet/>
  )
}

export default Prefetch