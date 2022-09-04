import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useGetUsersQuery } from '../../features/users/userApiSlice'
import ProductDetail from '../Products/productDetail/ProductDetail'
import './productDesc.scss'

const ProductDesc = () => {

//   const  {data: users,
//     isLoading,
//     isSuccess,
//     isError,
//     error
// } = useGetUsersQuery()
  return (
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
     
      {/* <DataTable/> */}
      <ProductDetail/>
    


    </div>
    
  </div>
  )
}

export default ProductDesc