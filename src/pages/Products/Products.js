import React, { useState } from "react";
import { Container, InputGroup, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import {
  selectAllProducts,
  useGetProductsQuery,
} from "../../features/products/productsApiSlice";
import Table from "react-bootstrap/Table";
import DeleteIcon from "@mui/icons-material/Delete";

import "./products.scss";
import AddNewProduct from "./addNewProduct/AddNewProduct";
import { Link } from "react-router-dom";


const Products = () => {
  //========add category modal state===================//

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //========****   add category modal *****===================//

  const {
    data: productList,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const productsArray = useSelector(selectAllProducts);

//====================delete directly===========================//





//====================delete directly===========================//

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Product name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {productsArray.length
            ? productsArray.map((product,i) => (
                <tr key={product._id}>
                  <td>{i+1}</td>
                  <td>
                    
                      {product.name}
                  
                  </td>
                  <td>{product?.category?.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                  <Link
                      to={product._id}
                      style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                    <EditIcon/>
                    </Link>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
  };

  return (
    <>
      <div className="home">
        <Sidebar />
        <div className="homeContainer">
          {/* <Navbar /> */}

          <Row>
            <Col md={12}>
              <div className="list-header">
                <h3>Products</h3>
                <button onClick={handleShow}>Add</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>{renderProducts()}</Col>
          </Row>

          <AddNewProduct
            setShow={setShow}
            show={show}
            handleClose={handleClose}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
