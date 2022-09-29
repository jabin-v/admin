import "./list.scss";
import * as React from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { selectAllOrders } from "../../features/orders/ordersApiSlice";
import {format} from "timeago.js"

const List = () => {

  const [status , setStatus] = React.useState('');

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

 

  const orders = useSelector(selectAllOrders);

















  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Order ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Quantity</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">AreaCode</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.slice(0,7).map((order) => (
            <TableRow key={order.orderItems._id}>
              <TableCell className="tableCell">{order.orderItems._id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={order.orderItems.image} alt="" className="image" />
                  {order.orderItems.productName}
                </div>
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {order.orderItems.quantity}
                </div>
              </TableCell>
              <TableCell className="tableCell">{order.orderItems.price}</TableCell>
              <TableCell className="tableCell">{format(order.createdAt)}</TableCell>
              <TableCell className="tableCell">{order.shippingInfo.zipcode

}</TableCell>
              
              <TableCell className="tableCell">
                <span className={`status ${order.orderItems.deliveryStatus} darkblue`}>{order.orderItems.deliveryStatus}</span>
                
              </TableCell> 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;