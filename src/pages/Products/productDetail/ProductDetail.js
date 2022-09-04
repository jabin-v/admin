import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectProdctIds, selectProductById, useDeleteProductMutation, useUpdateProductMutation } from '../../../features/products/productsApiSlice';
import UpdateProduct from '../UpdateProduct';
import './productDetail.css'

const ProductDetail = () => {
  const { productId } = useParams()

  const navigate = useNavigate()

  console.log(productId)

  const product = useSelector((state) => selectProductById(state, productId))

  console.log(product)

  console.log(product?.activity)


    const image1="https://m.media-amazon.com/images/I/81i057rz8gS._UL1500_.jpg"

    
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
            product?.images.map((img)=>
            <div key={img.url} className = "img-item">
            <a href = "#" data-id = "1">
              <img src = {img.url} alt = "shoe image"/>
            </a>
          </div>)
          }
          
       
         
          
    
    
      </div>
     
      <div className = "product-content">
        
        <h3><b></b>{product?.slug}</h3>
        <span><b>Slug :</b>{product?.name}</span>

        <div className = "product-price">
          <p className = "last-price">Old Price: <span>$ {product?.price}</span></p>
          <p className = "new-price">New Price: <span>$249.00 (5%)</span></p>
        </div>

        <div className = "product-detail">
          <h2>about this item: </h2>
          <p>{product?.description}</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, perferendis eius. Dignissimos, labore suscipit. Unde.</p>
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
            <li>ProductId: <span>{product?._id} </span></li>
            <li>Category: <span>{product?.category.name}</span></li>
            <li>Available: <span>{product?.quantity} <i>in stock</i></span></li>
            <li>Featured: <span>{product?.isFeatured ?  "Yes" :"No"} </span></li>
            <li>Offers: <span>{product?.offers === null ? "No offers" : `${product?.offers}`}</span></li>
            <li>Price: <span>{product?.price}</span></li>
            <li>Ratings Average: <span>{product?.ratingsAverage}</span></li>
            <li>Rating Quantity: <span>{product?.ratingsQuantity
}</span></li> 
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