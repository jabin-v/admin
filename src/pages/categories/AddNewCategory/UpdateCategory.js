import React, { useState } from "react";
import "./addNewCategory.scss";
import Input from "../../../components/Ui/Input";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useAddNewCategoryMutation } from '../../../features/categories/categoriesApiSlice';
import { Col, Form, Row } from "react-bootstrap";
import { useUpdateCategoryMutation } from "../../../features/categories/categoriesApiSlice";

const UpdateCategory = ({
  setShow,
  show,
  handleClose,
  categoryLIst,
  checkedArray,
  expandedArray,
  createCategoryList,
  setCheckedArray,
  setExpandedArray
}) => {
  // //from the backend
  // console.log(categoryLIst);

  //===========slice===========================//

  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();

  //===================================================================//

 

  //==============handle form=======================================//

  const handleCategoryInput=(key,value,index,type)=>{
     if(type === "checked"){

      const updatedCheckedArray=checkedArray.map((_value,_index)=>
        index === _index ? {..._value,[key]:value}:_value


        )

        setCheckedArray(updatedCheckedArray)

     }else if(type === "expanded"){

        const updatedExpandededArray=expandedArray.map((_value,_index)=>
        index === _index ? {..._value,[key]:value}:_value


        )
        setExpandedArray(updatedExpandededArray)

     }

  }

  //=============================================================//

 



  const onUpdatingCategory = async () => {

    const updatesList=[...checkedArray,...expandedArray];

   

    try {
      await updateCategory(updatesList).unwrap();
      
    } catch (error) {
      console.log("failed to update category")
      
    }

    setShow(false)
    // if (canSave) {
    //     try {
    //         await addNewCategory({ name:categoryName, parentId:parentcategoryId}).unwrap()
    //         setCategoryName("");
    //         setParentcategoryId("");
    //          setShow(false)
    //     } catch (err) {
    //         console.error('Failed to save the post', err)
    //     }
    // }

    
  };

  //==============handle form=======================================//

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>Expanded</Col>
        </Row>
        {expandedArray.length > 0  &&
          expandedArray.map((category, index) => 
            

            <Row key={index} className="mt-3">
            <Col>
              <Input
                value={category.name}
                placeholder={`Category name`}
                onChange={(e) => handleCategoryInput(`name`,e.target.value,index,"expanded")}
              />
            </Col>
            <Col>
              <Form.Select
                className="form-control"
                value={category.parentId}
                onChange={(e) => handleCategoryInput(`parentId`,e.target.value,index,"expanded")}

              >
                  <option>select category</option>
                  
                {createCategoryList(categoryLIst).map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option value="">select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </Form.Select>
            </Col>
        
          </Row>
          

          
          )}
        <Row>Checked</Row>
        {checkedArray.length >0 &&
          checkedArray.map((category, index) => 
            

            <Row key={index} className="mt-3">
            <Col>
              <Input
                value={category.name}
                placeholder={`Category name`}
                onChange={(e) => handleCategoryInput(`name`,e.target.value,index,"checked")}
              />
            </Col>
            <Col>
              <Form.Select
                className="form-control"
                value={category.parentId}
                onChange={(e) => handleCategoryInput(`parentId`,e.target.value,index,"checked")}

              >
                  <option>select category</option>
                  
                {createCategoryList(categoryLIst).map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Form.Select>
                <option value="">select type</option>
                <option value="store">Store</option>
                <option value="product">Product</option>
                <option value="page">Page</option>
              </Form.Select>
            </Col>
            
          </Row>
          

          
          )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onUpdatingCategory} >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateCategory;

//onClick={onUpdatingCategory}
