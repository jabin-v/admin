import React, { useState } from 'react'
import { Container, InputGroup, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import DataTable from '../../components/dataTable/DataTable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import {  selectAllProducts, useGetProductsQuery } from '../../features/products/productsApiSlice';
import Table from 'react-bootstrap/Table';




import './products.scss'
import AddNewProduct  from './addNewProduct/AddNewProduct'




const Products = () => {

  //========add category modal state===================//
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //========****   add category modal *****===================//
  

  




  const { data: productList,isLoading,isSuccess,isError,error}= useGetProductsQuery();
  const productsArray=useSelector(selectAllProducts);

  console.log(productsArray)

  

 


  const renderProducts=()=>{
    return(
      <Table striped bordered hover size="sm">
         <thead>
        <tr>
          <th>#</th>
          <th>Product name</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {
          productsArray.length ?

          productsArray.map((product)=>(

            <tr key={product._id} >
            <td>1</td>
            <td>{product.name}</td>
            <td>{product.category.name}</td>
            <td>{product.price}</td>
            <td>{product.quantity}</td>
          </tr>


          )) :null
        }
       
        
       
      </tbody>

      </Table>

    )
  }

 



 





  
 

 

  return (
  <>
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
      <Navbar/>
      <Container>
        <Row>
          <Col md={12}>
            <div className='list-header'>
            <h3>Products</h3>
            <button onClick={handleShow} >Add</button>
            </div>
            
          </Col>
        </Row>
        <Row>
          <Col >
          {renderProducts()}

          
          </Col>

        </Row>

      </Container>

      

      <AddNewProduct setShow={setShow} show={show} handleClose={handleClose} />

  


    </div>
    
  </div>
 


  </>
  )
}

export default Products




