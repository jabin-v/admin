import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ShippingInfo from "../../components/modal";
import Modal from "../../components/modal";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  selectAllOrders,
  useGetOrdersQuery,
} from "../../features/orders/ordersApiSlice";
import ProductDetail from "../Products/productDetail/ProductDetail";
import Cancel from "./Cancel";
import Status from "./Status";

import "./style.css";

const Order = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetOrdersQuery(
    undefined,
    {
      pollingInterval: 60000,
      refetchOnFocus: true,
      refetchOnMountOrArgChange: true,
    }
  );
  const orders = useSelector(selectAllOrders);

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <h4>orders</h4>
        <Table responsive="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Order Id</th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>status</th>
              <th>Cancel</th>
              <th>Shipping</th>
            </tr>
          </thead>
          <tbody>
            {orders.length
              ? orders.map((order, i) => (
                  <tr key={order.orderItems._id}>
                    <td>{i + 1}</td>
                    <td>{order.orderItems._id}</td>
                    <td>{order.orderItems.productName}</td>
                    <td>{order.orderItems.price}</td>
                    <td>{order.orderItems.quantity}</td>
                    <td>
                      {order.orderItems.price * order.orderItems.quantity}
                    </td>
                    <td>
                      <Status
                        progress={order.orderItems.deliveryStatus}
                        orderId={order.orderItems._id}
                        user={order.user}
                        productId={order.orderItems.product}
                        quantity={order.orderItems.quantity}
                      />
                    </td>
                    <td>
                      <Cancel
                        orderId={order.orderItems._id}
                        user={order.user}
                      />
                    </td>
                    <td style={{ cursor: "pointer" }}>
                      <Link to={`/orders/${order.orderItems._id}`}>Info</Link>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Order;
