import {
    createSelector,
    createEntityAdapter  
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";



const categoriesAdapter = createEntityAdapter({
    selectId: (e) => e._id
  });

const initialState=categoriesAdapter.getInitialState();

export const categoriesApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getCategories:builder.query({
            query:()=>"/category",
            transformResponse:responseData=>{

                console.log(categoriesAdapter)
                console.log(initialState);
                console.log(responseData);
                return categoriesAdapter.setAll(initialState,responseData.data)
            },
            providesTags: (result, error, arg) => [
                { type: 'Category', id: "LIST" }
                
            ]
        }),

        addNewCategory:builder.mutation({
            query:newCategory=>({
                url:'/category',
                method:'POST',
                body:{
                  
                    ...newCategory
                },
                
                       
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]

        }),

        updateCategory:builder.mutation({
            
            
            query:updatesList=>({
                url:"/category/update",
                method:"PUT",
                body:{updatesList}
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        deleteCategory: builder.mutation({
            query: deleteList => ({
                url: '/category/delete',
                method: 'DELETE',
                body: { deleteList }
            }),
            invalidatesTags: [
                { type: 'Category', id: "LIST" }
            ]
        }),
        
        


        


    })
})



export const {useGetCategoriesQuery,useAddNewCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation}=categoriesApiSlice;

export const selectCaegoriesResult = categoriesApiSlice.endpoints.getCategories.select();

// console.log(selectCaegoriesResult)

const selectCategoriesData = createSelector(
    selectCaegoriesResult,
    categoriesResult => categoriesResult.data // normalized state object with ids & entities
)



export const {
    selectAll: selectAllCategories,
    selectById: selectCategoryById,
    selectIds: selectCategoryIds
    // Pass in a selector that returns the posts slice of state
} = categoriesAdapter.getSelectors(state => selectCategoriesData(state) ?? initialState)
