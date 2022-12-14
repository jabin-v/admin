import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import {buildCreateApi} from '@reduxjs/toolkit/dist/query';

import {apiSlice} from '../../app/api/apiSlice' ;

const usersAdapter = createEntityAdapter({
    selectId: (e) => e._id
  }
    
);

const initialState=usersAdapter.getInitialState();

export const userApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        getUsers:builder.query({
            query:()=>'/users',
            
            transformResponse:responseData=>{

             
            
                return usersAdapter.setAll(initialState,responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: "LIST" },
                ...result.ids.map(id => ({ type: 'User', id }))
            ]
        })
    })
})


export const {
    useGetUsersQuery
    
}=userApiSlice

export const selectUsersResult = userApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
   
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)

