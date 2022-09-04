import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectOrderByid } from '../../features/orders/ordersApiSlice'
import './style.css'

const ShippingInfoCard = () => {
    const image1="https://m.media-amazon.com/images/I/81i057rz8gS._UL1500_.jpg"
    const { orderId } = useParams()

    console.log(orderId)

    const order = useSelector((state) => selectOrderByid(state, orderId))

    console.log(order)
  return (
    <div className='info-wrapper'>
        <div className='info-section'>
            <div className='order-product-details'>
            <div className='product-image'>
                <img src={order?.orderItems.image}/>

            </div>
            <div className='product-info'>
            <p style={{color:"red"}}><b>Product Info</b></p>
            <div>
                <p><b>Color :</b> {order?.orderItems.color}</p>
                <p><b>Price :</b> {order?.orderItems.price}</p>
                <p><b>size :</b> {order?.orderItems.size}</p>
                <p><b>Quantity :</b> {order?.orderItems.quantity}</p>
                <p><b>Product Id :</b> {order?.orderItems._id}</p>
            </div>

            </div>
           
            </div>
            <div className='shipping-info'>
                <p style={{color:"red"}}><b>Shipping Info</b></p>
                <p><b>City :</b> {order?.shippingInfo.city}</p>
                <p><b>State :</b> {order?.shippingInfo?.state}</p>
                <p><b>Zipcode :</b> {order?.shippingInfo?.zipcode}</p>
                <p><b>phone :</b> {order?.shippingInfo?.phonenumber}</p>
                <p><b>email :</b> {order?.shippingInfo?.email}</p>
                <p><b>name :</b> {order?.shippingInfo?.name}</p>
                <p><b>userId :</b> {order?.user}</p>

            </div>


        </div>

        
    </div>
  )
}

export default ShippingInfoCard