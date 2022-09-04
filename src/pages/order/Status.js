import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import { useUpdateOrderMutation } from '../../features/orders/ordersApiSlice';
export const options=[
    {
      id:1,
      value:"Processing"
    },
    {
      id:2,
      value:"packed"
    },
    {
      id:3,
      value:"shipped"
    },
    {
      id:4,
      value:"out for delivery"
    },
    {
      id:5,
      value:"delivered"
    }
  ]

const Status = ({progress,orderId,user,productId,quantity}) => {

    const [type,setType]=useState(progress)

    const [updateOrder, { isLoading }] = useUpdateOrderMutation();

    const handleChange=async(e)=>{
        //send request to backend
        setType(e.target.value)
        await updateOrder({user,orderId,productId,status:e.target.value,quantity}).unwrap()

     

    }


  return (
    <Form.Group controlId="formBasicSelect">
            <Form.Control
             as="select"
            value={type}
            onChange={
                handleChange
          }
        >
          {
            options.map((option)=><option key={option.id} value={option.value}>{option.value}</option>)
          }
   
        </Form.Control>
      </Form.Group>
  )
}

export default Status