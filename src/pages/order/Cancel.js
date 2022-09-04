import React from 'react'
import { useDeleteOrderMutation } from '../../features/orders/ordersApiSlice'

const Cancel = ({orderId,user}) => {

  const [deleteOrder, { isLoading }] = useDeleteOrderMutation();

    const handleDelete=async()=>{

        await deleteOrder({user,orderId}).unwrap()
    }
  return (
    <div
    style={{cursor:"pointer"}}
    onClick={handleDelete}
    
    >Cancel</div>
  )
}

export default Cancel