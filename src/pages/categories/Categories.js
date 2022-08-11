import React, { useState } from "react";
import { Container, InputGroup, Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import DataTable from "../../components/dataTable/DataTable";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

//=================================checkbox====================//
import {
  IoCheckboxSharp,
  IoCheckboxOutline,
  IoCheckmarkDoneOutline,
  IoCaretUpCircleSharp,
  IoCaretDownCircleSharp,
} from "react-icons/io5";

import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

//=================================checkbox====================//

import {
  selectAllCategories,
  selectCategoryById,
  selectCategoryIds,
  useAddNewCategoryMutation,
  useGetCategoriesQuery,
} from "../../features/categories/categoriesApiSlice";
// import Button from 'react-bootstrap/Button';

import "./categories.scss";

import AddNewCategory from "./AddNewCategory/AddNewCategory";
import UpdateCategory from "./AddNewCategory/UpdateCategory";
import DeleteCategory from "./AddNewCategory/DeleteCategory";

const Categories = () => {
  //===============checkbox tree state=============================//
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);

  //===============checkbox tree state=============================//

  //========add category modal state===================//

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //========****   add category modal *****===================//

  //================updateCategory============================//

  const handleUpdateCategoryClose = () => setUpdateCategoryModal(false);
  const handleUpdateCategoryOpen = () => setUpdateCategoryModal(true);

  const [checkedArray, setCheckedArray] = useState([]);
  const [expandedArray, setExpandedArray] = useState([]);

  //=======================******updateCategory******==============//


  //======================deletecategory===========================//

  const [deleteCategoryModal,setDeleteCategoryModal]=useState(false)

  //=================slice=====================================//

  const {
    data: cat,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  console.log(cat)

  const categoryLIst = useSelector(selectAllCategories);

  

  //================================================================//

  //============category list====linear list====================//

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {

      
      options.push({
        value: category._id,
        name: category.name,
        parentId: category.parentId,
      });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //============****** category list ******========================//

  //========================render html=============================//

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        label: category.name,
        value: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  //=======================================================================//

  //========onclick update=========//

  const updateCategory = () => {
    updateCheckedAndExpanded();
    setUpdateCategoryModal(true);
   
  };

  //========onclick delete=========//


  const deleteCategory=()=>{
    updateCheckedAndExpanded();
    setDeleteCategoryModal(true)

  }


  //==============***************==================//

  const updateCheckedAndExpanded=()=>{
    const linearList = createCategoryList(categoryLIst);

    console.log(linearList)

    const checkedArray = [];
    const expandedArray = [];

    checked.length &&
      checked.forEach((categoryId, index) => {
        const category = linearList.find(
          (category, _index) => categoryId == category.value
        );

        checkedArray.push(category);
      });
    expanded.length &&
      expanded.forEach((categoryId, index) => {
        const category = linearList.find(
          (category, _index) => categoryId == category.value
        );

        expandedArray.push(category);
      });

    setCheckedArray(checkedArray);
    setExpandedArray(expandedArray);


  }

  //=====================******************=================//

 

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Navbar />
          <Container>
            <Row>
              <Col md={12}>
                <div className="list-header">
                  <h3>Categories</h3>
                </div>
                <button onClick={handleShow}>Add</button>
                <button onClick={deleteCategory}>Delete</button>
                <button onClick={updateCategory}>Edit</button>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                {/* <ul>
          {renderCategories(categoryLIst)}
         
          </ul> */}
                <CheckboxTree
                  nodes={renderCategories(categoryLIst)}
                  checked={checked}
                  expanded={expanded}
                  onCheck={(checked) => setChecked(checked)}
                  onExpand={(expanded) => setExpanded(expanded)}
                  icons={{
                    check: <IoCheckboxSharp />,
                    uncheck: <IoCheckboxOutline />,
                    halfCheck: <IoCheckmarkDoneOutline />,
                    expandClose: <IoCaretDownCircleSharp />,
                    expandOpen: <IoCaretUpCircleSharp />,
                    IoCaretDownCircleSharp,
                  }}
                />
              </Col>
            </Row>
          </Container>

          <AddNewCategory
            setShow={setShow}
            show={show}
            handleClose={handleClose}
            categoryLIst={categoryLIst}
          />

          <UpdateCategory
            setShow={setUpdateCategoryModal}
            show={updateCategoryModal}
            handleClose={handleUpdateCategoryClose}
            categoryLIst={categoryLIst}
            createCategoryList={createCategoryList}
            checkedArray={checkedArray}
            expandedArray={expandedArray}
            setCheckedArray={setCheckedArray}
            setExpandedArray={setExpandedArray}
            
          />

          <DeleteCategory
            deleteCategoryModal={deleteCategoryModal}
            setDeleteCategoryModal={setDeleteCategoryModal}
            categoryLIst={categoryLIst}
            createCategoryList={createCategoryList}
            checkedArray={checkedArray}
            expandedArray={expandedArray}
            setCheckedArray={setCheckedArray}
            setExpandedArray={setExpandedArray}
          />
        </div>
      
      </div>
    </>
  );
};

export default Categories;
