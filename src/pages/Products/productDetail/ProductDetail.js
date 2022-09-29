import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectProdctIds, selectProductById, useDeleteProductMutation, useRemoveImageMutation, useUpdateProductMutation } from '../../../features/products/productsApiSlice';
import UpdateProduct from '../UpdateProduct';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './productDetail.css'

const ProductDetail = () => {
  const { productId } = useParams()


  const [removeImage, { isLoading, isSuccess, isError, error }] =
  useRemoveImageMutation();

  

  const navigate = useNavigate()

 
  const product = useSelector((state) => selectProductById(state, productId))

  const handleRemoveImage=async(imageUrl)=>{

    await removeImage({
      id:productId,
      image:imageUrl
    }).unwrap()

  }


   

    
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [deleteProduct, {
    isSuccess: isDelSuccess,
    isError: isDelError,
    error: delerror
}] = useDeleteProductMutation()

const onDeleteProductClicked = async () => {
  await deleteProduct({ id: productId })
}

useEffect(()=>{
  if ( isDelSuccess) {
    navigate('/products')
}

},[isDelSuccess,navigate])

  

    
  return (
     
    <div className = "card-wrapper">
    <div className = "card">
      
     
       
          <div className = "img-showcase">
         
          {
            product?.images?.map((img)=>
            <div key={img.url} className = "img-item">
            <a href = "#" data-id = "1">
              <img src = {img.url} alt = "shoe image" />
            </a>
            <DeleteForeverIcon className='deleteImage' onClick={()=>handleRemoveImage(img.url)} style={{color:"red"}}/>
          </div>)
          }
          
       
         
          
    
    
      </div>
     
      <div className = "product-content">
        
        <h3><b></b>{product?.slug}</h3>
        <span><b>Name :</b>{product?.name}</span>

        <div className = "product-detail">
          <h2>about this item: </h2>
          <p>{product?.description}</p>
          <ul>
            <li>Colors:
              {
                product?.colors.map((color)=> <span key={color}> {color} ,</span>)
              }
            </li>
            <li>Sizes:
              {
                product?.availableSizes?.map((size)=> <span key={size}> {size} ,</span>)
              }
            </li>
            <li>Activity:
              {
                product?.activity?.map((item)=> <span key={item}> {item} ,</span>)
              }
            </li>
            <li>Brand:
              {
                product.brand
              }
            </li>
            <li>ProductId: <span>{product?._id} </span></li>
            <li>Category: <span>{product?.category.name}</span></li>
            <li>Available: <span>{product?.quantity} <i>in stock</i></span></li>
            <li>Featured: <span>{product?.isFeatured ?  "Yes" :"No"} </span></li>
            <li>Offers: <span>{product?.offers === null ? "No offers" : `${product?.offers}`}</span></li>
            <li>Price: <span>{product?.price}</span></li>
            <li>Ratings Average: <span>{product?.ratingsAverage}</span></li>
            <li>Rating Quantity: <span>{product?.ratingsQuantity}</span></li> 


          </ul>
        </div>

        <div className = "purchase-info">
         
          <button type = "button" className = "btn" onClick={handleShow}>
           Edit
          </button>
          <button type = "button" className = "btn" onClick={onDeleteProductClicked}>
           Delelte
          </button>
        </div>

      
      </div>
    </div>
    {product && <UpdateProduct setShow={setShow} show={show} handleClose={handleClose} product={product}/>}
  </div>
  )
}

export default ProductDetail