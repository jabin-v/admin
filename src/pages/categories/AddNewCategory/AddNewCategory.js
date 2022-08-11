import React, { useState } from 'react';
import './addNewCategory.scss'
import Input from '../../../components/Ui/Input';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAddNewCategoryMutation } from '../../../features/categories/categoriesApiSlice';
import { Form } from 'react-bootstrap';

const AddNewCategory = ({setShow,show,handleClose,categoryLIst}) => {

  //===========state management============================//

  const [addNewCategory, { isLoading }] = useAddNewCategoryMutation()

  const [categoryName,setCategoryName]=useState('');
  const [parentcategoryId,setParentcategoryId]=useState('');

  const canSave = [categoryName].every(Boolean) && !isLoading;

  const onParentCategoryChange = e => setParentcategoryId(e.target.value)
  


    //=========== *****state management****============================//


  //============category list========================//

  const createCategoryList=(categories,options=[])=>{
    for(let category of categories ){
      options.push({value:category._id,name:category.name });
      if(category.children.length > 0){
        createCategoryList(category.children,options)
      }
  
    }
    return options;
  
   }


   //============****** category list ******========================//

   //==============handle form=======================================//

   //name parentId

   const onSaveCategory = async () => {
    if (canSave) {
        try {
            await addNewCategory({ name:categoryName, parentId:parentcategoryId}).unwrap()

            setCategoryName("");
            setParentcategoryId("");

             setShow(false)
        } catch (err) {
            console.error('Failed to save the post', err)
        }
    }
}







   //==============handle form=======================================//



 
  
  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Add category</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      
      <Input
      value={categoryName}
      placeholder={`Category name`}
      onChange={(e)=>setCategoryName(e.target.value)}
       
       />
       {/* <select className='form-control' onChange={onParentCategoryChange}>
        <option>select category</option>
       

        {
          createCategoryList(categoryLIst).map(option =>
            <option value={option.value} key={option.value}>{option.name}</option>)
        }
       </select> */}

      
      <Form.Select className='form-control' onChange={onParentCategoryChange}>
        <option>select category</option>
       {
          createCategoryList(categoryLIst).map(option =>
            <option value={option.value} key={option.value}>{option.name}</option>)
        }
      </Form.Select>
     
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={onSaveCategory} disabled={!canSave}>
        Save Changes
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default AddNewCategory