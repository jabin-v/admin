import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const productsAdapter = createEntityAdapter({
    selectId: (e) => e._id
  });

  const initialState=productsAdapter.getInitialState();

 export const productsApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getProducts:builder.query({
            query:()=>'/products',
            transformResponse:responseData=>{
                console.log(responseData)
                return productsAdapter.setAll(initialState,responseData.data)
            },
            providesTags: (result, error, arg) => [
                { type: 'Product', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Product', id }))
            ]
        }),
        addNewProduct:builder.mutation({
            query:(newProduct)=>(
                {
                    url:'/products',
                    method:'POST',
                    body:{
                        ...newProduct
                    }
                    
    
                }
            ),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]

        }),
        

        

    })
 })

 export const {useGetProductsQuery,useAddNewProductMutation}=productsApiSlice;
 export const selectProductsResult = productsApiSlice.endpoints.getProducts.select();

// console.log(selectCaegoriesResult)

const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data
)



export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProdctIds
   
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)
