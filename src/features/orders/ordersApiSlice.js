import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const ordersAdapter = createEntityAdapter(
    {
        selectId: (e) => e.orderItems._id
      }
);


  const initialState=ordersAdapter.getInitialState();

 export const ordersApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getOrders:builder.query({
            query:()=>'/order/stats',
            // keepUnusedDataFor:5,
            transformResponse:responseData=>{

                console.log(responseData)
            
                return ordersAdapter.setAll(initialState,responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Order', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Order', id }))
            ]
        }),

        updateOrder:builder.mutation({

            


            query:data=>({
                url:'/order',
                method:"PATCH",
                body:{
                    ...data
                }
                
            }),

            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id:arg.id }
            ]
        }),
        deleteOrder:builder.mutation({
            query:data=>({

                url:"/order/cancelorder",
                method:"PATCH",
                body:{

                    ...data
        
                }
                
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Order', id:arg.id }
            ]
        })

        

        

    })
 })

 export const {useGetOrdersQuery,useUpdateOrderMutation,useDeleteOrderMutation}=ordersApiSlice;
 export const selectOrderResult = ordersApiSlice.endpoints.getOrders.select();

console.log(selectOrderResult)

const selectOrdersData = createSelector(
    selectOrderResult,
    ordersResult => ordersResult.data
)



export const {
    selectAll: selectAllOrders,
    selectById: selectOrderByid,
    selectIds: selectorderIds
   
} = ordersAdapter.getSelectors(state => selectOrdersData(state) ?? initialState)
