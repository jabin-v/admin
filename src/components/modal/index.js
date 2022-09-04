import React from 'react';
import ShippingInfoCard from '../shippingInfoCard';
import Sidebar from '../sidebar/Sidebar';

import './style.css'

const ShippingInfo = ({show,setShow,handleClose}) => {
  return (
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
        <h4>Shipping info</h4>
        <ShippingInfoCard/>
     </div>
    </div>
   
  )
}

export default ShippingInfo



























