import React, { useState } from 'react'
import { Container, InputGroup, Row } from 'react-bootstrap';
import Col from 'react-bootstrap/Col'
import { useSelector } from 'react-redux'
import DataTable from '../../components/dataTable/DataTable'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'


import { selectAllCategories, selectCategoryById, selectCategoryIds, useAddNewCategoryMutation, useGetCategoriesQuery } from '../../features/categories/categoriesApiSlice'
// import Button from 'react-bootstrap/Button';

import './categories.scss'

import AddNewCategory from './AddNewCategory/AddNewCategory';


const Categories = () => {

  //========add category modal state===================//
 
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //========****   add category modal *****===================//
  

  




  const { data: categories,isLoading,isSuccess,isError,error}= useGetCategoriesQuery();

 



  const categoryLIst=useSelector(selectAllCategories);

  console.log(categoryLIst)

  const renderCategories=(categories)=>{
    let myCategories=[];
    for(let category of categories ){
      myCategories.push(
        <li key={category._id}>{category.name}
        {category.children.length > 0 ?  (<ul>{renderCategories(category.children)}</ul>) : ''}
        </li>
      )
    }

    return myCategories;
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
            <h3>Categories</h3>
            <button onClick={handleShow}  >Add</button>
            </div>
            
          </Col>
        </Row>
        <Row>
          <Col md={12}>
          <ul>
          {renderCategories(categoryLIst)}
         
          </ul>
          </Col>

        </Row>

      </Container>

      

      <AddNewCategory setShow={setShow} show={show} handleClose={handleClose} categoryLIst={categoryLIst}/>

  


    </div>
    
  </div>
 


  </>
  )
}

export default Categories