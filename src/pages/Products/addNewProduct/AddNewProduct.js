import React, { useState } from 'react';

import Input from '../../../components/Ui/Input';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useAddNewProductMutation } from '../../../features/products/productsApiSlice';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { selectCurrentToken } from '../../../features/auth/authSlice';
import { uploadImages } from "../../../function/uploadImages";
import dataURItoBlob from '../../../helpers/dataURIToBlob';
import { useSelector } from 'react-redux';
import { selectAllCategories, useGetCategoriesQuery } from '../../../features/categories/categoriesApiSlice';
import Multiselect from 'multiselect-react-dropdown';



const AddNewProduct = ({setShow,show,handleClose}) => {
 const token=useSelector(selectCurrentToken);


  //===========state management============================//

  const [addNewProduct, { isLoading }] = useAddNewProductMutation();

  const [name,setName]=useState("");
  const [description,setDescription]=useState("");
  const [price,setPrice]=useState("");
  const [offers,setOffers]=useState('');
  const[quantity,setQuantity]=useState("");
  const [images,setImages]=useState("");
  const [category,setCategory]=useState('')
  const [Error,setError]=useState('')
  const [colors,setColors]=useState([]);
  const [brand,setBrand]=useState("");
  const [activity,setActivity]=useState("");
  const [sizes,setSizes]=useState(null);
  const [isFeatured,setIsFeatured]=useState(false);

 


//=====================================================//

const handleOnChangeColors=(e)=>{
  setColors(e.target.value.split(','))
  console.log(colors)

}
const onBrandChange=(e)=>{
  setBrand(e.target.value)
  

}
const onSizeChange=(e)=>{
  setSizes(e.target.value.split(','));
  

}

const onActivityChange=(e)=>{
  setActivity(e.target.value.split(','));
  

}










//---------------------------------------------------------------//
                        //    handle input image files
const handleImages = (e) => {
  console.log(images)
    let files = Array.from(e.target.files);
    console.log(files)
    files.forEach((img) => {
      console.log(img);
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp" &&
        img.type !== "image/gif"
      ) {
        setError(
          `${img.name} format is unsupported ! only Jpeg, Png, Webp, Gif are allowed.`
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        console.log("reader")
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (readerEvent) => {
          setImages((images) => [...images, readerEvent.target.result]);
        };
      }
    });
  };


//------------------------create category-----------------------//
const { data: categories}= useGetCategoriesQuery();

const categoryLIst=useSelector(selectAllCategories);



const createCategoryList=(categories,options=[])=>{
  for(let category of categories ){
    options.push({value:category._id,name:category.name });
    if(category.children.length > 0){
      createCategoryList(category.children,options)
    }

  }
  return options;

 }






//------------------------create category-----------------------//


  //===============handling add product submission========//

  const canSave = [name, description, price,quantity,images].every(Boolean) && !isLoading;


//   ================================================================
  const onSumbmitProduct=async()=>{

    console.log("submitting");
    if(images && images.length) {
      console.log("first")
     
        const postImages = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = `${name}/product-image`;
        let formData = new FormData();
        formData.append("path", path);
        postImages.forEach((image) => {
          formData.append("file", image);
        });
        const response = await uploadImages(formData, path, token);

        console.log(response)
  
    
        if (canSave) {
            try {
              
                await addNewProduct({ 
                    name, description, 
                    price,quantity,
                    offers,category,
                    brand,activity,
                    response,colors,
                    sizes,isFeatured

                    

                }).unwrap()

                setImages('');
                setCategory('');
                setDescription("");
                setName('');
                setOffers('');
                setPrice("");
                setQuantity("");
                setActivity('');
                setBrand('');
                setSizes(null);
                setColors([]);
                setIsFeatured(false);


                setShow(false);


                
            } catch (err) {
                console.error('Failed to save the product', err)
            }

    
        
      } else{
        setError("invalid upload")
      }
  }
}

  




  


    //=========== *****state management****============================//



   //==============handle form=======================================//

   

//    const onSaveProduct = async () => {
//     if (canSave) {
//         try {
//             await addNewProduct({ name:categoryName, parentId:parentcategoryId}).unwrap()

//             setCategoryName("");
//             setParentcategoryId("");

//              setShow(false)
//         } catch (err) {
//             console.error('Failed to save the post', err)
//         }
//     }
// }







   //==============handle form=======================================//



 
  
  return (
    <Modal show={show} onHide={handleClose}  size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Add product</Modal.Title>

      {Error && <p>{Error}</p>}
    </Modal.Header>
    <Modal.Body>
     <Container>
     <Row>
      <Col>
      <Input
      className="mt-2"
       value={name}
       placeholder={`product....`}
       onChange={(e)=>setName(e.target.value)}
       />
      <Input
      className="mt-2"
       value={description}
       placeholder={`Description....`}
       onChange={(e)=>setDescription(e.target.value)}
       />
       <Input
      className="mt-2"
       value={price}
       placeholder={`Enter Price`}
       onChange={(e)=>setPrice(e.target.value)}
       />
       <Input
       className="mt-2"
       value={offers}
       placeholder={`Enter offers if any`}
       onChange={(e)=>setOffers(e.target.value)}
       />
       <Input
       className="mt-2"
       value={colors}
       placeholder={`colors available`}
       onChange={handleOnChangeColors}
       />
       <Input
       className="mt-2"
       value={activity}
       placeholder={`Activity`}
       onChange={onActivityChange}
       />
       
      
      
      </Col>
      <Col>
      <Input
       className="mt-2"
       value={quantity}
       placeholder={`Enter stock`}
       onChange={(e)=>setQuantity(e.target.value)}
       
       />
     
      <Form.Select className='mt-2' 
        onChange={(e)=>setCategory(e.target.value)}
        value={category}
        
        >
          <option>----select category----</option>
        {
           createCategoryList(categoryLIst).map(option =>
             <option value={option.value} key={option.value}>{option.name}</option>)
         }
       </Form.Select>
       <Form.Group controlId="formFile" className="mt-2">
        
         <Form.Control
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleImages}



           />
       </Form.Group>
       <Input
       className="mt-2"
       value={sizes}
       placeholder={`Enter sizes available`}
       onChange={onSizeChange}
       />
       
  
      <Input
       className="mt-2"
       value={brand}
       placeholder={`Enter brands available`}
       onChange={onBrandChange}
       />
       <Form.Select className='mt-2' 
        onChange={(e)=>
          setIsFeatured(e.target.value)
        }
        
        value={isFeatured}
        
        >
          
             <option>featured product ?</option>
             <option value="false" key="123">No</option>
             <option value="true" key="126">Yes</option>
           
         
       </Form.Select>
      
      </Col>

     
      
       
      
       </Row>
     </Container>

     
      
     
      
      {/* <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          hidden
          
          onChange={handleImages}
        /> */}

       
     
      
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button
      disabled={!canSave}
       variant="primary" onClick={onSumbmitProduct} >
        {isLoading ? "loading.." : "Save changes"}
      </Button>
    </Modal.Footer>
  </Modal>
  )
}


export default AddNewProduct