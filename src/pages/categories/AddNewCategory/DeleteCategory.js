
import React, { useState } from 'react'
import { NewModal } from '../../../components/Ui/modal'
import { Col, Form, Row } from "react-bootstrap";
import Input from '../../../components/Ui/Input';
import { useDeleteCategoryMutation } from '../../../features/categories/categoriesApiSlice';



const DeleteCategory = ({  
    setDeleteCategoryModal,
    deleteCategoryModal,
    categoryLIst,
    checkedArray,
    expandedArray,
    createCategoryList,
    setCheckedArray,
    setExpandedArray
}) => {
    const[deleteCategory]=useDeleteCategoryMutation()

    const deleteCategories=async()=>{
       
        const checkedIdArray=checkedArray.map((item,index)=>({_id:item.value}));



        try {
            await deleteCategory(checkedIdArray).unwrap();
            
        } catch (error) {
            console.log("error in delete post")
            
        }

        setDeleteCategoryModal(false)

    }
   


  return (
        <NewModal
        modalTitle="confirm"
        show={deleteCategoryModal}
        handleClose={()=>setDeleteCategoryModal(false)}
        buttons={[
            {
                label:"No",
                color:"primary",
                onclick:()=>{
                    alert('no')
                }
            },
            {
                label:"Yes",
                color:"danger",
                onClick:deleteCategories
            }
        ]}

        
        >
       
        
        <h5>Selected categories</h5>
        {
         checkedArray.map((item,index)=><span key={index}>{item.name} {" | "}</span>)

        }

     
        
        
        </NewModal>
   
  )
}

export default DeleteCategory